import { createContext } from 'react';
import { IFlagsState, IFlagsSetters } from '../../interfaces';
import {
  IConfigurableComponentProps,
} from './models';

export type IFlagProgressFlags =
  | 'addComponent'
  | 'updateComponent'
  | 'deleteComponent'
  | 'moveComponent'
  | 'load'
  | 'save' /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags =
  | 'addComponent'
  | 'updateComponent'
  | 'deleteComponent'
  | 'moveComponent'
  | 'load'
  | 'save' /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags =
  | 'addComponent'
  | 'updateComponent'
  | 'deleteComponent'
  | 'moveComponent'
  | 'load'
  | 'save' /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags = '__DEFAULT__' /* NEW_ACTIONED_FLAG_GOES_HERE */;

export interface ILayoutProps {
  span: number;
}

// todo: make generic!!!!!
export interface IConfigurableComponentStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags>,
    IConfigurableComponentProps {
}

export interface IComponentLoadPayload {
  id: string;
}

export interface IComponentLoadErrorPayload {
  error: string;
}

export interface IComponentLoadSuccessPayload {
  id?: string;
  name?: string;
  description?: string;
  settings: string;
}

export interface IConfigurableComponentActionsContext
  extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  load: () => void;
  save: (settings: string) => Promise<void>;
}

/** Component initial state */
export const CONFIGURABLE_COMPONENT_CONTEXT_INITIAL_STATE: IConfigurableComponentStateContext = {
  isInProgress: {},
  succeeded: {},
  error: {},
  actioned: {},
  settings: null,
};

export const ConfigurableComponentStateContext = createContext<IConfigurableComponentStateContext>(CONFIGURABLE_COMPONENT_CONTEXT_INITIAL_STATE);

export const ConfigurableComponentActionsContext = createContext<IConfigurableComponentActionsContext>(undefined);
