import { createContext } from 'react';
import { IModelItem } from '../../interfaces/modelConfigurator';

export interface IUpdateChildItemsPayload {
  index: number[];
  childs: IModelItem[];
}

export interface IUpdateItemSettingsPayload {
  id: string;
  settings: IModelItem;
}

export interface IModelSettings {
  id?: string;
  className?: string;
  namespace?: string;

  friendlyName?: string | null;
  typeShortAlias?: string | null;
  tableName?: string | null;
  discriminatorValue?: string | null;
}

export interface IModelConfiguratorStateContext extends IModelSettings{
  items: IModelItem[];
  selectedItemId?: string;
}

export interface IModelConfiguratorActionsContext {
  load: () => void;
  save: () => Promise<void>;
  setModelSettings: (settings: IModelSettings) => void;
  addItem: () => void;
  deleteItem: (uid: string) => void;
  selectItem: (uid: string) => void;
  updateChildItems: (payload: IUpdateChildItemsPayload) => void;
  getItem: (uid: string) => IModelItem;
  updateItem: (payload: IUpdateItemSettingsPayload) => void;

  addGroup: () => void;
  deleteGroup: (uid: string) => void;

  /* NEW_ACTION_ACTION_DECLARATIOS_GOES_HERE */
}

export const MODEL_CONFIGURATOR_CONTEXT_INITIAL_STATE: IModelConfiguratorStateContext = {
  items: [],
};

export const ModelConfiguratorStateContext = createContext<IModelConfiguratorStateContext>(
  MODEL_CONFIGURATOR_CONTEXT_INITIAL_STATE
);

export const ModelConfiguratorActionsContext = createContext<IModelConfiguratorActionsContext>(undefined);
