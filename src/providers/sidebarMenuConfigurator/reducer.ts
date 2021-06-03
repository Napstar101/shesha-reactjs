import {
  ISidebarMenuConfiguratorStateContext,
  IUpdateChildItemsPayload,
  IUpdateItemSettingsPayload,
  SIDEBAR_MENU_CONTEXT_INITIAL_STATE,
} from './contexts';
import { SidebarMenuActionEnums } from './actions';
import { ISidebarMenuItemProps } from './models';
import { v4 as uuid } from 'uuid';
import { handleActions } from 'redux-actions';
import { getItemById, getItemPositionById } from './utils';

const sidebarMenuReducer = handleActions<ISidebarMenuConfiguratorStateContext, any>(
  {
    [SidebarMenuActionEnums.AddItem]: (state: ISidebarMenuConfiguratorStateContext) => {
      
      const buttonProps: ISidebarMenuItemProps = {
        id: uuid(),
        itemType: 'button',
        sortOrder: state.items.length,
        name: `New item`,
        childItems: [],
      };

      const newItems = [...state.items];
      //const parent = state.selectedItemId ? getItemById(newItems, state.selectedItemId) : null;
      const parent = null;

      if (parent) {
        parent.childItems = [...parent.childItems, buttonProps];
      } else newItems.push(buttonProps);

      return {
        ...state,
        items: newItems,
        selectedItemId: buttonProps.id,
      };
    },

    [SidebarMenuActionEnums.DeleteItem]: (
      state: ISidebarMenuConfiguratorStateContext,
      action: ReduxActions.Action<string>
    ) => {
      const { payload } = action;

      const newItems = state.items.filter(item => item.id !== payload);

      return {
        ...state,
        items: [...newItems],
        selectedItemId: state.selectedItemId === payload ? null : state.selectedItemId,
      };
    },

    [SidebarMenuActionEnums.SelectItem]: (state: ISidebarMenuConfiguratorStateContext, action: ReduxActions.Action<string>) => {
      const { payload } = action;

      return {
        ...state,
        selectedItemId: payload,
      };
    },

    [SidebarMenuActionEnums.UpdateItem]: (
      state: ISidebarMenuConfiguratorStateContext,
      action: ReduxActions.Action<IUpdateItemSettingsPayload>
    ) => {
      const { payload } = action;

      const newItems = [...state.items];

      const position = getItemPositionById(newItems, payload.id);
      if (!position) return state;

      let newArray = position.ownerArray;
      newArray[position.index] = {
        ...newArray[position.index],
        ...payload.settings,
      };

      return {
        ...state,
        items: newItems,
      };
    },

    [SidebarMenuActionEnums.UpdateChildItems]: (
      state: ISidebarMenuConfiguratorStateContext,
      action: ReduxActions.Action<IUpdateChildItemsPayload>
    ) => {
      const {
        payload: { index, childs: childIds },
      } = action;
      if (!Boolean(index) || index.length == 0) {
        return {
          ...state,
          items: childIds,
        };
      }
      // copy all items
      const newItems = [...state.items];
      // blockIndex - full index of the current container
      const blockIndex = [...index];
      // lastIndex - index of the current element in its' parent
      const lastIndex = blockIndex.pop();

      // search for a parent item
      const lastArr = blockIndex.reduce((arr, i) => arr[i]['childItems'], newItems);

      // and set a list of childs
      lastArr[lastIndex]['childItems'] = childIds;

      return {
        ...state,
        items: newItems,
      };
    },
  },

  SIDEBAR_MENU_CONTEXT_INITIAL_STATE
);

export default sidebarMenuReducer;
