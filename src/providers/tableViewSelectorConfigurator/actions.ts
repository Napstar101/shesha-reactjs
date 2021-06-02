import { createAction } from 'redux-actions';
import { IUpdateChildItemsPayload, IUpdateItemSettingsPayload } from './contexts';
//import { ITableViewSelectorConfiguratorStateContext } from './contexts';

export enum ToolbarActionEnums {
  AddItem = 'ADD_BUTTON',
  DeleteItem = 'DELETE_BUTTON',

  AddGroup = 'ADD_GROUP',
  DeleteGroup = 'DELETE_GROUP',

  UpdateItem = 'UPDATE_ITEM',
  SelectFilter = 'SELECT_ITEM',

  UpdateChildItems = 'UPDATE_CHILD_ITEMS',
  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const addButtonAction = createAction(ToolbarActionEnums.AddItem);

export const deleteButtonAction = createAction<string, string>(ToolbarActionEnums.DeleteItem, p => p);

export const addGroupAction = createAction(ToolbarActionEnums.AddGroup);
export const deleteGroupAction = createAction<string, string>(ToolbarActionEnums.DeleteGroup, p => p);

export const selectItemAction = createAction<string, string>(ToolbarActionEnums.SelectFilter, p => p);

export const updateChildItemsAction = createAction<IUpdateChildItemsPayload, IUpdateChildItemsPayload>(
  ToolbarActionEnums.UpdateChildItems,
  p => p
);

export const updateItemAction = createAction<IUpdateItemSettingsPayload, IUpdateItemSettingsPayload>(
  ToolbarActionEnums.UpdateItem,
  p => p
);

/* NEW_ACTION_GOES_HERE */
