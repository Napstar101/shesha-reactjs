import React, { FC, useContext, PropsWithChildren } from 'react';
import metadataReducer from './reducer';
import {
  MetadataDispatcherActionsContext,
  MetadataDispatcherStateContext,
  METADATA_DISPATCHER_CONTEXT_INITIAL_STATE,
  IMetadataDispatcherStateContext,
  IMetadataDispatcherActionsContext,
  IGetMetadataPayload,
  IModelMetadata,
  IRegisterProviderPayload,
} from './contexts';
import {
  loadMetadataAction,
  loadMetadataSuccessAction,
  loadMetadataErrorAction,
  registerProviderAction,
  activateProviderAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import useThunkReducer from 'react-hook-thunk-reducer';
import { metadataGetProperties } from '../../apis/metadata';
import { IPropertyMetadata } from './models';
import { useSheshaApplication } from '../../providers';

export interface IMetadataDispatcherProviderProps {
}

const MetadataDispatcherProvider: FC<PropsWithChildren<IMetadataDispatcherProviderProps>> = ({
  children,
}) => {
  const initial: IMetadataDispatcherStateContext = {
    ...METADATA_DISPATCHER_CONTEXT_INITIAL_STATE,
  };

  const [state, dispatch] = useThunkReducer(metadataReducer, initial);

  //const parentProvider = useMetadataDispatcher(false);

  const { backendUrl, httpHeaders } = useSheshaApplication();
  /* NEW_ACTION_DECLARATION_GOES_HERE */

  const getMetadata = (payload: IGetMetadataPayload) => {
    const { modelType } = payload;
    const loadedModel = state.models[payload.modelType];
    if (loadedModel)
      return Promise.resolve(loadedModel);

    dispatch(loadMetadataAction({ modelType: payload.modelType }));

    const result = new Promise<IModelMetadata>((resolve, reject) => {
      metadataGetProperties({ container: modelType }, { base: backendUrl, headers: httpHeaders })
        .then(response => {
          if (!response.success) {
            dispatch(loadMetadataErrorAction({ modelType: payload.modelType, error: response.error?.message }));
            reject(response.error);
          }
          const properties = response.result.map<IPropertyMetadata>(p => ({
            path: p.path,
            label: p.label,
            description: p.description,

            isVisible: p.isVisible,
            readonly: p.readonly,
            orderIndex: p.orderIndex,
            groupName: p.groupName,

            //#region data type
            dataType: p.dataType,
            entityTypeShortAlias: p.entityTypeShortAlias,
            referenceListName: p.referenceListName,
            referenceListNamespace: p.referenceListNamespace,
            //#endregion

            //#region validation
            required: p.required,
            minLength: p.minLength,
            maxLength: p.maxLength,
            min: p.min,
            max: p.max,
            isEmail: p.isEmail
          }));
          const meta: IModelMetadata = {
            type: payload.modelType,
            name: payload.modelType, // todo: fetch name from server
            properties
          };

          dispatch(loadMetadataSuccessAction({ metadata: meta }));

          resolve(meta);
        })
        .catch(e => {
          dispatch(loadMetadataErrorAction({ modelType: payload.modelType, error: e }));
          reject(e)
        });
    });

    return result;
  }

  const registerProvider = (payload: IRegisterProviderPayload) => {
    const existingProvider = state.providers.find(p => p.id === payload.id);
    if (!existingProvider)
      dispatch(registerProviderAction(payload));
  }

  const activateProvider = (providerId: string) => {
    dispatch(activateProviderAction(providerId));
  }

  const getActiveProvider = () => {
    return state.activeProvider
      ? state.providers.find(p => p.id === state.activeProvider)?.publicRef.current
      : null;
  }

  const metadataActions: IMetadataDispatcherActionsContext = {
    getMetadata,
    registerProvider,
    activateProvider,
    getActiveProvider,
    /* NEW_ACTION_GOES_HERE */
  };

  return (
    <MetadataDispatcherStateContext.Provider value={state}>
      <MetadataDispatcherActionsContext.Provider value={metadataActions}>{children}</MetadataDispatcherActionsContext.Provider>
    </MetadataDispatcherStateContext.Provider>
  );
};

function useMetadataDispatcherState(require: boolean) {
  const context = useContext(MetadataDispatcherStateContext);

  if (context === undefined && require) {
    throw new Error('useMetadataDispatcherState must be used within a MetadataDispatcherProvider');
  }

  return context;
}

function useMetadataDispatcherActions(require: boolean) {
  const context = useContext(MetadataDispatcherActionsContext);

  if (context === undefined && require) {
    throw new Error('useMetadataDispatcherActions must be used within a MetadataDispatcherProvider');
  }

  return context;
}

function useMetadataDispatcher(require: boolean = true) {
  return { ...useMetadataDispatcherState(require), ...useMetadataDispatcherActions(require) };
}

export { MetadataDispatcherProvider, useMetadataDispatcherState, useMetadataDispatcherActions, useMetadataDispatcher };
