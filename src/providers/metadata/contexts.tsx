import { createContext } from 'react';
import { IPropertyMetadata } from './models';

export interface IMetadataStateContext {
  id: string;
  containerType: string;
  properties?: IPropertyMetadata[];
}

export interface ILoadPropertiesPayload {
  containerType: string;
}

export interface ILoadPropertiesSuccessPayload {
  properties: IPropertyMetadata[];
}

export interface IMetadataActionsContext {
  loadProperties: (payload: ILoadPropertiesPayload) => void;
}

/** initial state */
export const METADATA_CONTEXT_INITIAL_STATE: IMetadataStateContext = {
  id: null,
  containerType: null,
};

export const MetadataStateContext = createContext<IMetadataStateContext>(METADATA_CONTEXT_INITIAL_STATE);

export const MetadataActionsContext = createContext<IMetadataActionsContext>(undefined);