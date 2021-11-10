import { createContext } from 'react';
import { IPropertyMetadata } from './models';

export interface IModelMetadata {
  type: string;
  name?: string;
  description?: string;
  properties: IPropertyMetadata[];
}

export interface IMetadataStateContext {
  id: string;
  models : { [key: string]: IModelMetadata };
  inProgress: string[];
  failed: string[];
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

export interface IMetadataActionsContext {
  getMetadata: (payload: IGetMetadataPayload) => Promise<IModelMetadata>;
}

/** initial state */
export const METADATA_CONTEXT_INITIAL_STATE: IMetadataStateContext = {
  id: null,
  models: {},
  failed: [],
  inProgress: [],
};

export const MetadataStateContext = createContext<IMetadataStateContext>(METADATA_CONTEXT_INITIAL_STATE);

export const MetadataActionsContext = createContext<IMetadataActionsContext>(undefined);