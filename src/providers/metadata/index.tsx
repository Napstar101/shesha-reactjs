import React, { FC, useContext, PropsWithChildren, useEffect } from 'react';
import metadataReducer from './reducer';
import {
  MetadataActionsContext,
  MetadataStateContext,
  METADATA_CONTEXT_INITIAL_STATE,
  ILoadPropertiesPayload,
  IMetadataStateContext,
  IMetadataActionsContext,
} from './contexts';
import {
  loadPropertiesAction as loadPropertiesAction, loadPropertiesSuccessAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import useThunkReducer from 'react-hook-thunk-reducer';
import { useMetadataProperties } from '../../apis/metadata';
import { IPropertyMetadata } from './models';

export interface IMetadataProviderProps {
  id: string;
  containerType: string;
  onMetadataLoaded?: (properties: IPropertyMetadata[]) => void;
  cleanup?: () => void;
}

const MetadataProvider: FC<PropsWithChildren<IMetadataProviderProps>> = ({
  id,
  children,
  containerType,
  onMetadataLoaded,
  cleanup,
}) => {
  const initial: IMetadataStateContext = {
    ...METADATA_CONTEXT_INITIAL_STATE,
    id,
    containerType: containerType,
  };

  const [state, dispatch] = useThunkReducer(metadataReducer, initial);

  const { /*loading, data, error,*/ mutate: fetchProperties } = useMetadataProperties({ queryParams: { container: containerType } });

  // execute cleanup code on unmount
  useEffect(() => {
    return () => {
      //console.log('cleanup');
      if (cleanup)
        cleanup();
    }
  }, []);

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  const loadProperties = (payload: ILoadPropertiesPayload) => {
    dispatch(loadPropertiesAction(payload));
    
    // fetch properties from the back-end
    fetchProperties()
      .then(response => {
        if (response.success){
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
          dispatch(loadPropertiesSuccessAction({
            properties: properties
          }));
          if (onMetadataLoaded)
            onMetadataLoaded(properties);
        }
      });
  };
  
  useEffect(() => {
    //console.log('fetch properties by MP, containerType: ' + containerType);
    loadProperties({ containerType: containerType });
  }, [containerType]);

  const metadataActions: IMetadataActionsContext = {
    loadProperties,
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
