import React, { FC, useContext, PropsWithChildren, useEffect } from 'react';
import configurableComponentReducer from './reducer';
import {
  ConfigurableComponentActionsContext,
  ConfigurableComponentStateContext,
  CONFIGURABLE_COMPONENT_CONTEXT_INITIAL_STATE,
  IConfigurableComponentActionsContext,
} from './contexts';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  loadRequestAction,
  loadSuccessAction,
  loadErrorAction,
  saveRequestAction,
  saveSuccessAction,
  saveErrorAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { useConfigurableComponentGet, /*useConfigurableComponentUpdate,*/ useConfigurableComponentUpdateSettings, ConfigurableComponentUpdateSettingsInput } from '../../apis/configurableComponent';
import useThunkReducer from 'react-hook-thunk-reducer';

export interface IConfigurableComponentProviderProps {
  id?: string;
}

const ConfigurableComponentProvider: FC<PropsWithChildren<IConfigurableComponentProviderProps>> = ({
  children,
  id,
}) => {
  // const initial: IConfigurableComponentStateContext = {
  //   ...CONFIGURABLE_COMPONENT_CONTEXT_INITIAL_STATE,
  //   id: id,
  // };

  const [state, dispatch] = useThunkReducer(configurableComponentReducer, {
    ...CONFIGURABLE_COMPONENT_CONTEXT_INITIAL_STATE,
    id: id,
  });

  const { loading: isFetching, error: fetchingError, data: fetchingResponse, refetch } = useConfigurableComponentGet({ lazy: true, id: id });

  const doFetch = () => {
    dispatch(loadRequestAction({ id }));
    refetch({});
  };

  useEffect(() => {
    //if (state.settings) return;

    doFetch();
  }, [id]);

  useEffect(() => {
    if (!isFetching){
      if (fetchingResponse)
        dispatch(loadSuccessAction({ 
          ...fetchingResponse,
          settings: fetchingResponse.settings // todo: parse JSON and cast to a specified type
        }));
      if (fetchingError)
        dispatch(loadErrorAction({ error: fetchingError?.['message'] || 'Failed to load component'}));
    }
  }, [isFetching, fetchingError, fetchingResponse]);

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  const loadComponent = () => {
    doFetch();
  };

  // todo: review usage of useFormUpdateMarkup after
  const { mutate: saveFormHttp /*, loading: saveFormInProgress, error: saveFormError*/ } = useConfigurableComponentUpdateSettings({
    id: id,
  });

  const saveComponent = (): Promise<void> => {
    if (!state.id) return new Promise(() => { });

    dispatch(saveRequestAction());

    const dto: ConfigurableComponentUpdateSettingsInput = {
      id: state.id,
      settings: state.settings,
    };
    return saveFormHttp(dto, {})
      .then(_response => {
        dispatch(saveSuccessAction());
      })
      .catch(_error => {
        dispatch(saveErrorAction());
      });
  };

  const configurableFormActions: IConfigurableComponentActionsContext = {
    ...getFlagSetters(dispatch),
    load: loadComponent,
    save: saveComponent,
    /* NEW_ACTION_GOES_HERE */
  };

  return (
    <ConfigurableComponentStateContext.Provider value={state}>
      <ConfigurableComponentActionsContext.Provider value={configurableFormActions}>
        {children}
      </ConfigurableComponentActionsContext.Provider>
    </ConfigurableComponentStateContext.Provider>
  );
};

function useConfigurableComponentState() {
  const context = useContext(ConfigurableComponentStateContext);

  if (context === undefined) {
    throw new Error('useConfigurableComponentState must be used within a ConfigurableComponentProvider');
  }

  return context;
}

function useConfigurableComponentActions() {
  const context = useContext(ConfigurableComponentActionsContext);

  if (context === undefined) {
    throw new Error('useConfigurableComponentActions must be used within a ConfigurableComponentProvider');
  }

  return context;
}

function useConfigurableComponent() {
  return { ...useConfigurableComponentState(), ...useConfigurableComponentActions() };
}

export { ConfigurableComponentProvider, useConfigurableComponentState, useConfigurableComponentActions, useConfigurableComponent };
