import React, { FC, useReducer, useContext, PropsWithChildren, useEffect } from 'react';
import appConfiguratorReducer from './reducer';
import { AppConfiguratorActionsContext, AppConfiguratorStateContext, APP_CONTEXT_INITIAL_STATE } from './contexts';
import { ApplicationMode } from './models';
import {
  switchApplicationModeAction,
  toggleEditModeConfirmationAction,
  toggleCloseEditModeConfirmationAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';

export interface IAppConfiguratorProviderProps {}

const AppConfiguratorProvider: FC<PropsWithChildren<IAppConfiguratorProviderProps>> = ({ children }) => {
  const [state, dispatch] = useReducer(appConfiguratorReducer, {
    ...APP_CONTEXT_INITIAL_STATE,
  });

  useEffect(() => {
    if (!document) return;

    if (state.mode === 'live') {
      document.body.classList.remove('sha-app-editmode');
    }
    if (state.mode === 'edit') {
      document.body.classList.add('sha-app-editmode');
    }
  }, [state.mode]);

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  const switchApplicationMode = (mode: ApplicationMode) => {
    dispatch(switchApplicationModeAction(mode));
  };

  const toggleEditModeConfirmation = (visible: boolean) => {
    dispatch(toggleEditModeConfirmationAction(visible));
  };

  const toggleCloseEditModeConfirmation = (visible: boolean) => {
    dispatch(toggleCloseEditModeConfirmationAction(visible));
  };

  return (
    <AppConfiguratorStateContext.Provider value={state}>
      <AppConfiguratorActionsContext.Provider
        value={{
          switchApplicationMode,
          toggleEditModeConfirmation,
          toggleCloseEditModeConfirmation,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </AppConfiguratorActionsContext.Provider>
    </AppConfiguratorStateContext.Provider>
  );
};

function useAppConfiguratorState() {
  const context = useContext(AppConfiguratorStateContext);

  if (context === undefined) {
    throw new Error('useAppConfiguratorState must be used within a AppConfiguratorProvider');
  }

  return context;
}

function useAppConfiguratorActions() {
  const context = useContext(AppConfiguratorActionsContext);

  if (context === undefined) {
    throw new Error('useAppConfiguratorActions must be used within a AppConfiguratorProvider');
  }

  return context;
}

function useAppConfigurator() {
  return { ...useAppConfiguratorState(), ...useAppConfiguratorActions() };
}

export {
  AppConfiguratorProvider,
  useAppConfiguratorState,
  useAppConfiguratorActions,
  useAppConfigurator,
  ApplicationMode,
};
