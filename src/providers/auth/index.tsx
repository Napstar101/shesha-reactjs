import React, { FC, useReducer, useContext, useEffect, PropsWithChildren, useMemo } from 'react';
import { authReducer } from './reducer';
import { AuthStateContext, AuthActionsContext, AUTH_CONTEXT_INITIAL_STATE, ILoginForm } from './contexts';
import {
  loginUserAction,
  loginUserSuccessAction,
  loginUserErrorAction,
  logoutUserAction,
  verifyOtpSuccessAction,
  resetPasswordSuccessAction,
  setAccessTokenAction,
  setRequestHeadersAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { URL_LOGIN_PAGE, URL_HOME_PAGE, URL_CHANGE_PASSWORD } from '../../constants';
import IdleTimer from 'react-idle-timer';
import { IAccessToken } from '../../interfaces';
import { OverlayLoader } from '../../components/overlayLoader';
import { useSessionGetCurrentLoginInformations } from '../../apis/session';
import { ResetPasswordVerifyOtpResponse } from '../../apis/user';
import { getFlagSetters } from '../utils/flagsSetters';
import { getAccessToken, removeAccessToken, saveUserToken } from '../../utils/auth';
import {
  useTokenAuthAuthenticate,
  AuthenticateResultModelAjaxResponse,
  useTokenAuthSignOff,
} from '../../apis/tokenAuth';
import { getLocalizationOrDefault } from '../../utils/localization';
import { getTenantId } from '../../utils/multitenancy';
import { useShaRouting } from '../shaRouting';
import IRequestHeaders from '../../interfaces/requestHeaders';

interface IAuthProviderProps {
  /**
   * What the token name should be
   *
   * TODO: The whole authorization and storing of token needs to be reviewed
   */
  tokenName: string;

  /**
   * A callback for when the request headers are changed
   */
  onSetRequestHeaders?: (headers: IRequestHeaders) => void;

  /**
   * URL that that the user should be redirected to if they're not authorized. Default is /login
   */
  unauthorizedRedirectUrl?: string;

  whitelistUrls?: string[];
}

const AuthProvider: FC<PropsWithChildren<IAuthProviderProps>> = ({
  children,
  tokenName = '',
  onSetRequestHeaders,
  unauthorizedRedirectUrl = URL_LOGIN_PAGE,
  whitelistUrls
}) => {
  const { router } = useShaRouting();

  const [state, dispatch] = useReducer(authReducer, AUTH_CONTEXT_INITIAL_STATE);
  const setters = getFlagSetters(dispatch);

  //#region Fetch user login info
  const {
    loading: isFetchingCurrentLoginInformation,
    refetch: fetchCurrentLoginInformation,
    error: fetchUserInfoErrorResult,
    data: userInfoData,
  } = useSessionGetCurrentLoginInformations({
    lazy: true,
  });

  useEffect(() => {
    if (!isFetchingCurrentLoginInformation) {
      if (userInfoData) {
        dispatch(loginUserSuccessAction(userInfoData.result.user));

        if (state.requireChangePassword) {
          router?.push(URL_CHANGE_PASSWORD);
        } else {
          const returnUrl = router?.query?.returnUrl as string;
          if (router?.route === URL_LOGIN_PAGE) {
            router?.push(returnUrl ?? URL_HOME_PAGE);
          } else if (returnUrl) {
            router?.push(returnUrl);
          } else {
            router?.push(router);
          }
        }
      }

      if (fetchUserInfoErrorResult) {
        dispatch(loginUserErrorAction({ message: 'Oops, something went wrong' }));
      }
    }
  }, [isFetchingCurrentLoginInformation]);
  //#endregion

  const init = () => {
    setters?.setIsInProgressFlag({ isIdle: false });
  };

  //#region AuthToken
  const trySetTokenReturnHeaderIfSet = (t: string = null): any => {
    const headers: { [key: string]: string } = {};
    const tokenObj = getAccessToken(tokenName);

    let token = '';
    if (t) {
      token = t;
    } else if (tokenObj?.accessToken && !state.token) {
      token = tokenObj.accessToken;
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      dispatch(setAccessTokenAction(token));
    }

    headers['.AspNetCore.Culture'] = getLocalizationOrDefault();

    const tenantId = getTenantId();

    if (tenantId) {
      headers['Abp.TenantId'] = getTenantId().toString();
    }

    setRequestHeaders(headers);

    return Boolean(token) ? headers : null;
  };

  const clearAccessToken = () => {
    removeAccessToken(tokenName);
    setRequestHeaders({});
  };

  const setRequestHeaders = (headers: IRequestHeaders) => {
    dispatch(setRequestHeadersAction(headers));
    if (onSetRequestHeaders) onSetRequestHeaders(headers);
  };
  //#endregion

  useEffect(() => {
    init();

    const hasAccessToken = trySetTokenReturnHeaderIfSet();

    const redirect = (url: string) => {
      router?.push(url);
      return;
    };

    if (!hasAccessToken) {
      if (router?.pathname === URL_LOGIN_PAGE || router?.pathname === unauthorizedRedirectUrl || whitelistUrls?.includes(router?.pathname)) {
        return redirect(router?.asPath); // Make sure we don't end up with /login?returnUrl=/login
      }

      if (router?.pathname === URL_HOME_PAGE) return redirect(unauthorizedRedirectUrl);

      return redirect(`${URL_LOGIN_PAGE}?returnUrl=${router?.pathname}`);
    } else fetchCurrentLoginInformation({ requestOptions: { headers: hasAccessToken } });
  }, []);

  //#region  Login
  const { mutate: loginUserHttp } = useTokenAuthAuthenticate({});

  const loginSuccessHandler = (data: AuthenticateResultModelAjaxResponse) => {
    if (data) {
      const tokenResult = saveUserToken(data.result as IAccessToken, tokenName);

      // Token saved successfully
      if (tokenResult) {
        const unsavedHeaders = trySetTokenReturnHeaderIfSet(tokenResult?.accessToken);

        // Let's fetch the user info
        fetchCurrentLoginInformation({ requestOptions: { headers: unsavedHeaders } });
      }

      if (data.error) {
        dispatch(loginUserErrorAction(data?.error as any));
      }
    }
  };

  const loginUser = (loginFormData: ILoginForm) => {
    dispatch(loginUserAction()); // We jut want to let the user know we're logging in

    loginUserHttp(loginFormData)
      .then(loginSuccessHandler)
      .catch(err => {
        dispatch(loginUserErrorAction(err?.data));
      });
  };
  ////#endregion

  //#region Logout user
  const { mutate: signOffRequest } = useTokenAuthSignOff({});

  /**
   * Log the user
   */
  const logoutUser = () => {
    // We don't care if signing off was successful or not

    signOffRequest(null);

    clearAccessToken();
    dispatch(logoutUserAction());
  };
  //#endregion

  const anyOfPermissionsGranted = (permissions: string[]) => {
    const { loginInfo } = state;
    if (!loginInfo) return false;

    if (!permissions) return true;

    const granted = loginInfo.grantedPermissions || [];
    return permissions.some(p => granted.includes(p));
  };

  const anyOfPermissionsGrantedWrapper = (permissions: string[]) => {
    const granted = anyOfPermissionsGranted(permissions);

    return granted;
  };

  //#region Reset password
  /**
   *
   * @param verifyOtpResPayload - the payload for resetting the password
   */
  const verifyOtpSuccess = (verifyOtpResPayload: ResetPasswordVerifyOtpResponse) => {
    // Redirect to the reset password page

    // router?.push(URL_RESET_PASSWORD);
    dispatch(verifyOtpSuccessAction(verifyOtpResPayload));
  };

  // This action will simply clear state.verifyOtpResPayload
  const resetPasswordSuccess = () => {
    dispatch(resetPasswordSuccessAction());
  };

  const showLoader = useMemo(() => {
    return !!(
      (
        isFetchingCurrentLoginInformation ||
        state.isInProgress?.isIdle ||
        (!isFetchingCurrentLoginInformation && !state.loginInfo && state.token)
      ) // Done fetching user info but the state is not yet updated
    );
  }, [isFetchingCurrentLoginInformation, state]);

  const isNotAuthorized = useMemo(() => {
    return !state.loginInfo && !state.token && !isFetchingCurrentLoginInformation;
  }, [state, isFetchingCurrentLoginInformation]);

  // const routerTo = (path: string) => {
  //   if (router) {
  //     router?.push(path);
  //   }
  // }

  //#endregion

  if (showLoader) {
    return <OverlayLoader loading={true} loadingText="Initializing..." />;
  }

  if (isNotAuthorized) {
    if (whitelistUrls?.includes(router?.pathname) || router?.pathname === unauthorizedRedirectUrl) {
      // TODO: 
    }
    else if (!router?.pathname?.includes(URL_LOGIN_PAGE)) {
      // Not authorized
      // console.log('Not authorized router :>> ', router);
      router?.push(URL_LOGIN_PAGE);
    }
  }

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <IdleTimer>
      <AuthStateContext.Provider value={state}>
        <AuthActionsContext.Provider
          value={{
            ...setters,
            loginUser,
            logoutUser,
            anyOfPermissionsGranted: anyOfPermissionsGrantedWrapper,
            verifyOtpSuccess,
            resetPasswordSuccess,
            /* NEW_ACTION_GOES_HERE */
          }}
        >
          {children}
        </AuthActionsContext.Provider>
      </AuthStateContext.Provider>
    </IdleTimer>
  );
};

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}

function useAuthActions() {
  const context = useContext(AuthActionsContext);
  if (context === undefined) {
    throw new Error('useAuthActions must be used within a AuthProvider');
  }
  return context;
}

function useAuth() {
  return { ...useAuthActions(), ...useAuthState() };
}

export default AuthProvider;

export { AuthProvider, useAuthState, useAuthActions, useAuth };
