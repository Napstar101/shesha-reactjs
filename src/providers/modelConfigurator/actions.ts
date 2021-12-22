import { createAction } from 'redux-actions';
import { ModelConfigurationDto, ErrorInfo } from '../../apis/modelConfigurations';
import { IModelSettings, IUpdateChildItemsPayload, IUpdateItemSettingsPayload } from './contexts';

export enum ModelActionEnums {
  LoadRequest = 'LOAD_REQUEST',
  LoadSuccess = 'LOAD_SUCCESS',
  LoadError = 'LOAD_ERROR',
  
  SaveRequest = 'SAVE_REQUEST',
  SaveSuccess = 'SAVE_SUCCESS',
  SaveError = 'SAVE_ERROR',

  SetModelSettings = 'SET_MODEL_SETTINGS',

  Save = 'SAVE',
  AddItem = 'ADD_ITEM',
  DeleteItem = 'DELETE_ITEM',
  UpdateItem = 'UPDATE_ITEM',
  AddGroup = 'ADD_GROUP',
  DeleteGroup = 'DELETE_GROUP',
  SelectItem = 'SELECT_ITEM',
  UpdateChildItems = 'UPDATE_CHILD_ITEMS',
  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const loadRequestAction = createAction(ModelActionEnums.LoadRequest);
export const loadSuccessAction = createAction<ModelConfigurationDto, ModelConfigurationDto>(ModelActionEnums.LoadSuccess, p => p);
export const loadErrorAction = createAction<ErrorInfo, ErrorInfo>(ModelActionEnums.LoadError, p => p);

export const saveRequestAction = createAction(ModelActionEnums.SaveRequest);
export const saveSuccessAction = createAction(ModelActionEnums.SaveSuccess);
export const saveErrorAction = createAction<ErrorInfo, ErrorInfo>(ModelActionEnums.SaveError, p => p);

export const setModelSettingsAction = createAction<IModelSettings, IModelSettings>(ModelActionEnums.SetModelSettings, p => p);

export const saveAction = createAction(ModelActionEnums.Save);

export const addItemAction = createAction(ModelActionEnums.AddItem);

export const deleteItemAction = createAction<string, string>(ModelActionEnums.DeleteItem, p => p);

export const addGroupAction = createAction(ModelActionEnums.AddGroup);
export const deleteGroupAction = createAction<string, string>(ModelActionEnums.DeleteGroup, p => p);

export const selectItemAction = createAction<string, string>(ModelActionEnums.SelectItem, p => p);

export const updateChildItemsAction = createAction<IUpdateChildItemsPayload, IUpdateChildItemsPayload>(
  ModelActionEnums.UpdateChildItems,
  p => p
);

export const updateItemAction = createAction<IUpdateItemSettingsPayload, IUpdateItemSettingsPayload>(
  ModelActionEnums.UpdateItem,
  p => p
);

/* NEW_ACTION_GOES_HERE */
