import { createContext } from 'react';
import { ApplicationMode, IComponentSettings } from './models';

export interface IAppStateContext {
  editModeConfirmationVisible: boolean;
  closeEditModeConfirmationVisible: boolean;
  mode: ApplicationMode;
}

export interface IAppActionsContext {
  switchApplicationMode: (mode: ApplicationMode) => void;
  toggleEditModeConfirmation: (visible: boolean) => void;
  toggleCloseEditModeConfirmation: (visible: boolean) => void;
  getSettings: (id: string) => Promise<IComponentSettings>;
  invalidateSettings: (id: string) => void;

  /* NEW_ACTION_ACTION_DECLARATIO_GOES_HERE */
}

export const APP_CONTEXT_INITIAL_STATE: IAppStateContext = {
  editModeConfirmationVisible: false,
  closeEditModeConfirmationVisible: false,
  mode: 'live',
};

export const AppConfiguratorStateContext = createContext<IAppStateContext>(APP_CONTEXT_INITIAL_STATE);

export const AppConfiguratorActionsContext = createContext<IAppActionsContext>(undefined);
