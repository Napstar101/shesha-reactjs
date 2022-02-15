import { createContext } from 'react';
import {
  ResetPasswordVerifyOtpInput,
  ResetPasswordVerifyOtpResponse,
  ResetPasswordUsingTokenInput,
  AjaxResponseBase,
  UserResetPasswordSendOtpQueryParams,
} from '../../apis/user';
import { UserLoginInfoDto } from '../../apis/session';
import { IErrorInfo } from '../../interfaces/errorInfo';
import { AuthenticateModel } from '../../apis/tokenAuth';
import IRequestHeaders from '../../interfaces/requestHeaders';

export interface ILoginForm extends AuthenticateModel {
  rememberMe?: boolean;
}

export interface IAuthStateContext {
  isCheckingAuth?: boolean;
  isFetchingUserInfo?: boolean;
  loginInfo?: UserLoginInfoDto;
  requireChangePassword?: boolean;
  loginUserSuccessful?: boolean | null;
  token?: string;
  headers?: IRequestHeaders;
  // The below field is just a placeholder for an `IFlagErrorFlags`. Whenever an error occurs, we'd like to pass errorInfo so that we can render ValidationErrors properly
  errorInfo?: IErrorInfo;

  //#region Forgot password
  mobileNo?: string; // Reset password sendOtp mobile number
  selectedMobileNumber?: string;
  verifyOtpReqPayload?: ResetPasswordVerifyOtpInput;
  verifyOtpResPayload?: ResetPasswordVerifyOtpResponse;
  isResettingPasswordUsingToken?: boolean;
  isResetPasswordUsingTokenSuccessful?: boolean;
  resetPasswordUsingTokenError?: string;
  resetPasswordUsingTokenReqPayload?: ResetPasswordUsingTokenInput;
  resetPasswordUsingTokenResPayload?: AjaxResponseBase;
  resetPasswordVerifyOtpPayload?: UserResetPasswordSendOtpQueryParams;
  //#endregion
}

export interface IAuthActionsContext {
  //extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  loginUser?: (loginFormData: ILoginForm) => void;

  logoutUser?: () => Promise<unknown>;

  /** Returns true if any of specified permissions granted to the current user */
  anyOfPermissionsGranted: (permissions: string[]) => boolean;

  verifyOtpSuccess: (verifyOtpResPayload: ResetPasswordVerifyOtpResponse) => void;

  resetPasswordSuccess?: () => void;

  getAccessToken: () => string;

  checkAuth?: () => void;

  /* NEW_ACTION_ACTION_DECLARATION_GOES_HERE */
}

export const AUTH_CONTEXT_INITIAL_STATE: IAuthStateContext = {
  isCheckingAuth: false,
  isFetchingUserInfo: false,
};

export const AuthStateContext = createContext<IAuthStateContext>(AUTH_CONTEXT_INITIAL_STATE);

export const AuthActionsContext = createContext<IAuthActionsContext | undefined>(undefined);
