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
  modelType: string;
}

export interface IMetadataActionsContext {
  getMetadata: () => Promise<IModelMetadata>;
}

export interface IMetadataContext extends IMetadataStateContext, IMetadataActionsContext {
  
}

/** initial state */
export const METADATA_CONTEXT_INITIAL_STATE: IMetadataStateContext = {
  id: null,
  modelType: null,
};

export const MetadataStateContext = createContext<IMetadataStateContext>(METADATA_CONTEXT_INITIAL_STATE);

export const MetadataActionsContext = createContext<IMetadataActionsContext>(undefined);