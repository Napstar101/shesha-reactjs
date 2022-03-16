import { IAnyObject } from './../../interfaces/anyObject';
import { createContext } from 'react';

export interface ISetStatePayload {
  data?: any;
  key?: string;
}

export interface IGlobalStateStateContext {
  globalState?: IAnyObject;
}

export interface IGlobalStateActionsContext {
  setState?: (payload: ISetStatePayload) => void;
  clearState?: (stateKey: string) => void;
  getStateByKey?: (key: string) => IAnyObject;
}

export const GLOBAL_STATE_CONTEXT_INITIAL_STATE: IGlobalStateStateContext = { globalState: {} };

export const GlobalStateStateContext = createContext<IGlobalStateStateContext>(GLOBAL_STATE_CONTEXT_INITIAL_STATE);

export const GlobalStateActionsContext = createContext<IGlobalStateActionsContext>(undefined);
