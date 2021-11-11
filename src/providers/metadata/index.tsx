import React, { FC, useContext, PropsWithChildren, useEffect, useRef } from 'react';
import metadataReducer from './reducer';
import {
  MetadataActionsContext,
  MetadataStateContext,
  METADATA_CONTEXT_INITIAL_STATE,
  IMetadataStateContext,
  IMetadataActionsContext,
  IMetadataContext,
} from './contexts';
import {
  // loadMetadataAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import useThunkReducer from 'react-hook-thunk-reducer';
import { useMetadataDispatcher } from '../../providers';

export interface IMetadataProviderProps {
  id?: string;
  modelType: string;
}

const MetadataProvider: FC<PropsWithChildren<IMetadataProviderProps>> = ({
  id,
  modelType,
  children,
}) => {
  const initial: IMetadataStateContext = {
    ...METADATA_CONTEXT_INITIAL_STATE,
    id,
    modelType,
  };
  //@ts-ignore
  const [state, dispatch] = useThunkReducer(metadataReducer, initial);

  // register provider in the dispatcher if exists
  const { registerProvider, getMetadata: fetchMeta } = useMetadataDispatcher(false);
  
  useEffect(() => {
    if (modelType)
      fetchMeta({ modelType });
  }, [modelType]);  

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  const getMetadata = () => {
    return fetchMeta({ modelType });
  }

  const metadataActions: IMetadataActionsContext = {
    /* NEW_ACTION_GOES_HERE */
    getMetadata
  };

  const metaRef = useRef<IMetadataContext>({ ...state, ...metadataActions });  
  registerProvider({ id, modelType, publicRef: metaRef });

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
