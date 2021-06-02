import { createContext } from 'react';

export interface ISheshaApplicationStateContext {
  backendUrl: string;
  httpHeaders: { [key: string]: string };
}

export const SHESHA_APPLICATION_CONTEXT_INITIAL_STATE: ISheshaApplicationStateContext = {
  backendUrl: '',
  httpHeaders: {},
};

export interface ISheshaApplicationActionsContext {
  changeBackendUrl?: (backendUrl: string) => void;
}

export const DEFAULT_ACCESS_TOKEN_NAME = 'xDFcxiooPQxazdndDsdRSerWQPlincytLDCarcxVxv';

export const SheshaApplicationStateContext = createContext<ISheshaApplicationStateContext>(SHESHA_APPLICATION_CONTEXT_INITIAL_STATE);

export const SheshaApplicationActionsContext = createContext<ISheshaApplicationActionsContext | undefined>(undefined);