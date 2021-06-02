import { createAction } from 'redux-actions';
import { UserLoginInfoDto } from '../../apis/session';
import { ResetPasswordVerifyOtpResponse } from '../../apis/user';
import { IErrorInfo } from '../../interfaces/errorInfo';
import IRequestHeaders from '../../interfaces/requestHeaders';
import { IAuthStateContext } from './contexts';
export enum AuthActionEnums {
  SetToken = 'SET_TOKEN',
  SetHeaders = 'SET_HEADERS',
  LoginUserRequest = 'LOGIN_USER_REQUEST',
  LoginUserSuccess = 'LOGIN_USER_SUCCESS',
  LoginUserError = 'LOGIN_USER_ERROR',
  LogoutUser = 'LOGOUT_USER',
  FetchUserDataRequest = 'FETCH_USER_DATA_REQUEST',
  FetchUserDataSuccess = 'FETCH_USER_DATA_SUCCESS',
  FetchUserDataError = 'FETCH_USER_DATA_ERROR',

  //#region Rest Password
  VerifyOtpSuccess = 'VERIFY_OTP_SUCCESS',
  //#endregion

  ResetPasswordSuccess = 'RESET_PASSWORD_SUCCESS',
  /* NEW_ACTION_TYPE_GOES_HERE */
}

//#region  Login user
export const loginUserAction = createAction<IAuthStateContext>(AuthActionEnums.LoginUserRequest, () => ({}));

export const loginUserSuccessAction = createAction<IAuthStateContext, UserLoginInfoDto>(
  AuthActionEnums.LoginUserSuccess,
  loginInfo => ({ loginInfo })
);

export const loginUserErrorAction = createAction<IAuthStateContext, IErrorInfo>(
  AuthActionEnums.LoginUserError,
  errorInfo => ({ errorInfo })
);
//#endregion

//#region Logout user
export const logoutUserAction = createAction<IAuthStateContext>(AuthActionEnums.LogoutUser, () => ({}));

//#endregion

export const verifyOtpSuccessAction = createAction<IAuthStateContext, ResetPasswordVerifyOtpResponse>(
  AuthActionEnums.VerifyOtpSuccess,
  verifyOtpResPayload => ({ verifyOtpResPayload })
);

export const resetPasswordSuccessAction = createAction<IAuthStateContext>(AuthActionEnums.ResetPasswordSuccess, () => ({
  verifyOtpResPayload: null,
}));
/* NEW_ACTION_GOES_HERE */

//#region Token and Headers
export const setAccessTokenAction = createAction<IAuthStateContext, string>(AuthActionEnums.SetToken, token => ({
  token,
}));

export const setRequestHeadersAction = createAction<IAuthStateContext, IRequestHeaders>(
  AuthActionEnums.SetHeaders,
  headers => ({ headers })
);
//#endregion
