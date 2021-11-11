import { createContext, MutableRefObject } from 'react';
import { IMetadataContext } from '../metadata/contexts';
import { IPropertyMetadata } from './models';

export interface IModelMetadata {
  type: string;
  name?: string;
  description?: string;
  properties: IPropertyMetadata[];
}

export interface IMetadataDispatcherStateContext {
  id: string;
  models : { [key: string]: IModelMetadata };
  inProgress: string[];
  failed: string[];
  providers: IMetadataProviderRegistration[];
  activeProvider?: string;
}

export interface ILoadMetadataPayload {
  modelType: string;
}

export interface ILoadMetadataSuccessPayload {
  metadata: IModelMetadata;  
}

export interface ILoadMetadataErrorPayload {
  modelType: string;
  error: string;
}

export interface IGetMetadataPayload {
  modelType: string;
}

export interface IRegisterProviderPayload {
  id: string;
  modelType: string;
  publicRef: MutableRefObject<IMetadataContext>;
}

export interface IMetadataDispatcherActionsContext {
  getMetadata: (payload: IGetMetadataPayload) => Promise<IModelMetadata>;
  registerProvider: (payload: IRegisterProviderPayload) => void;
  // todo: add `unregisterProvider`
  activateProvider: (providerId: string) => void;
  getActiveProvider: () => IMetadataContext;
}

export interface IMetadataProviderRegistration {
  id: string;
  modelType: string;
  publicRef: MutableRefObject<IMetadataContext>;
}

/** initial state */
export const METADATA_DISPATCHER_CONTEXT_INITIAL_STATE: IMetadataDispatcherStateContext = {
  id: null,
  models: {},
  failed: [],
  inProgress: [],
  providers: [],
};

export const MetadataDispatcherStateContext = createContext<IMetadataDispatcherStateContext>(METADATA_DISPATCHER_CONTEXT_INITIAL_STATE);

export const MetadataDispatcherActionsContext = createContext<IMetadataDispatcherActionsContext>(undefined);