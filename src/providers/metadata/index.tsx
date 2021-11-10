import React, { FC, useContext, PropsWithChildren } from 'react';
import metadataReducer from './reducer';
import {
  MetadataActionsContext,
  MetadataStateContext,
  METADATA_CONTEXT_INITIAL_STATE,
  IMetadataStateContext,
  IMetadataActionsContext,
  IGetMetadataPayload,
  IModelMetadata,
} from './contexts';
import {
  loadMetadataAction,
  loadMetadataSuccessAction,
  loadMetadataErrorAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import useThunkReducer from 'react-hook-thunk-reducer';
import { metadataGetProperties } from '../../apis/metadata';
import { IPropertyMetadata } from './models';
import { useSheshaApplication } from '../../providers';

export interface IMetadataProviderProps {
  id?: string;
}

const MetadataProvider: FC<PropsWithChildren<IMetadataProviderProps>> = ({
  id,
  children,
}) => {
  const initial: IMetadataStateContext = {
    ...METADATA_CONTEXT_INITIAL_STATE,
    id,
  };

  const [state, dispatch] = useThunkReducer(metadataReducer, initial);

  //const parentProvider = useMetadata(false);

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

  const metadataActions: IMetadataActionsContext = {
    getMetadata,
    /* NEW_ACTION_GOES_HERE */
  };

  return (
    <MetadataStateContext.Provider value={state}>
      <MetadataActionsContext.Provider value={metadataActions}>{children}</MetadataActionsContext.Provider>
    </MetadataStateContext.Provider>
  );
};

function useMetadataState(require: boolean) {
  const context = useContext(MetadataStateContext);

  if (context === undefined && require) {
    throw new Error('useMetadataState must be used within a MetadataProvider');
  }

  return context;
}

function useMetadataActions(require: boolean) {
  const context = useContext(MetadataActionsContext);

  if (context === undefined && require) {
    throw new Error('useMetadataActions must be used within a MetadataProvider');
  }

  return context;
}

function useMetadata(require: boolean = true) {
  return { ...useMetadataState(require), ...useMetadataActions(require) };
}

export { MetadataProvider, useMetadataState, useMetadataActions, useMetadata };
