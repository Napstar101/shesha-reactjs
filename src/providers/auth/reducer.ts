import { AuthActionEnums } from './actions';
import flagsReducer from '../utils/flagsReducer';
import { IAuthStateContext } from './contexts';

export function authReducer(
  incomingState: IAuthStateContext,
  action: ReduxActions.Action<IAuthStateContext>
): IAuthStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action);

  const { type, payload } = action;
  //#endregion

  switch (type) {
    case AuthActionEnums.LogoutUser: {
      return {
        isInProgress: {},
      };
    }
    case AuthActionEnums.LoginUserRequest:
    case AuthActionEnums.CheckAuthAction:
    case AuthActionEnums.LoginUserSuccess:
    case AuthActionEnums.LoginUserError:

    case AuthActionEnums.FetchUserDataRequest:
    case AuthActionEnums.FetchUserDataSuccess:
    case AuthActionEnums.FetchUserDataError:
    //#region Forgot password
    case AuthActionEnums.VerifyOtpSuccess:
    case AuthActionEnums.ResetPasswordSuccess:
    case AuthActionEnums.SetToken:
    case AuthActionEnums.SetHeaders:
      /* NEW_ACTION_ENUM_GOES_HERE */

      //#endregion
      return {
        ...state,
        ...payload,
      };

    default: {
      return state;
    }
  }
}
