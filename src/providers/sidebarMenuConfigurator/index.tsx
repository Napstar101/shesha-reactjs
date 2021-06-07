import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import sidebarMenuReducer from './reducer';
import {
  IUpdateChildItemsPayload,
  IUpdateItemSettingsPayload,
  SidebarMenuConfiguratorActionsContext,
  SidebarMenuConfiguratorStateContext,
  SIDEBAR_MENU_CONTEXT_INITIAL_STATE,
} from './contexts';
import {
  addItemAction,
  deleteItemAction,
  selectItemAction,
  updateChildItemsAction,
  updateItemAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { getItemById } from './utils';
import { ISidebarMenuItem } from '../sidebarMenu';

export interface ISidebarMenuConfiguratorProviderPropsBase {
  baseUrl?: string;
}

export interface ISidebarMenuConfiguratorProviderProps {
  items: ISidebarMenuItem[];
}

const SidebarMenuConfiguratorProvider: FC<PropsWithChildren<ISidebarMenuConfiguratorProviderProps>> = props => {
  const {
    children,
  } = props;

  const [state, dispatch] = useReducer(sidebarMenuReducer, {
    ...SIDEBAR_MENU_CONTEXT_INITIAL_STATE,
    items: props.items || [],
  });

  const addItem = () => {
    dispatch(addItemAction());
  };

  const deleteItem = (uid: string) => {
    dispatch(deleteItemAction(uid));
  };

  const selectItem = (uid: string) => {
    dispatch(selectItemAction(uid));
  };

  const updateChildItems = (payload: IUpdateChildItemsPayload) => {
    dispatch(updateChildItemsAction(payload));
  };

  const getItem = (uid: string): ISidebarMenuItem => {
    return getItemById(state.items, uid);
  };

  const updateItem = (payload: IUpdateItemSettingsPayload) => {
    dispatch(updateItemAction(payload));
  };
  
  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <SidebarMenuConfiguratorStateContext.Provider value={state}>
      <SidebarMenuConfiguratorActionsContext.Provider
        value={{
          addItem,
          deleteItem,
          selectItem,
          updateChildItems,
          getItem,
          updateItem,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </SidebarMenuConfiguratorActionsContext.Provider>
    </SidebarMenuConfiguratorStateContext.Provider>
  );
};

function useSidebarMenuConfiguratorState() {
  const context = useContext(SidebarMenuConfiguratorStateContext);

  if (context === undefined) {
    throw new Error('useSidebarMenuConfiguratorState must be used within a SidebarMenuConfiguratorProvider');
  }

  return context;
}

function useSidebarMenuConfiguratorActions() {
  const context = useContext(SidebarMenuConfiguratorActionsContext);

  if (context === undefined) {
    throw new Error('useSidebarMenuConfiguratorActions must be used within a SidebarMenuConfiguratorProvider');
  }

  return context;
}

function useSidebarMenuConfigurator() {
  return { ...useSidebarMenuConfiguratorState(), ...useSidebarMenuConfiguratorActions() };
}

export { SidebarMenuConfiguratorProvider, useSidebarMenuConfigurator };
