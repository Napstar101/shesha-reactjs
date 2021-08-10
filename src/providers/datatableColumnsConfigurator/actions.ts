import { createAction } from 'redux-actions';
import { IUpdateChildItemsPayload, IUpdateItemSettingsPayload } from './contexts';
//import { IColumnsConfiguratorStateContext } from './contexts';

export enum ColumnsActionEnums {
  AddButton = 'ADD_BUTTON',
  DeleteButton = 'DELETE_BUTTON',

  AddGroup = 'ADD_GROUP',
  DeleteGroup = 'DELETE_GROUP',

  UpdateItem = 'UPDATE_ITEM',
  SelectItem = 'SELECT_ITEM',

  UpdateChildItems = 'UPDATE_CHILD_ITEMS',
  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const addButtonAction = createAction(ColumnsActionEnums.AddButton);

export const deleteButtonAction = createAction<string, string>(ColumnsActionEnums.DeleteButton, p => p);

export const addGroupAction = createAction(ColumnsActionEnums.AddGroup);
export const deleteGroupAction = createAction<string, string>(ColumnsActionEnums.DeleteGroup, p => p);

export const selectItemAction = createAction<string, string>(ColumnsActionEnums.SelectItem, p => p);

export const updateChildItemsAction = createAction<IUpdateChildItemsPayload, IUpdateChildItemsPayload>(
  ColumnsActionEnums.UpdateChildItems,
  p => p
);

export const updateItemAction = createAction<IUpdateItemSettingsPayload, IUpdateItemSettingsPayload>(
  ColumnsActionEnums.UpdateItem,
  p => p
);

/* NEW_ACTION_GOES_HERE */
