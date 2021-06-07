import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import SidebarMenuReducer from './reducer';
import { SidebarMenuActionsContext, SidebarMenuStateContext, SIDEBAR_MENU_CONTEXT_INITIAL_STATE } from './contexts';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  toggleSidebarAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { useAuth } from '../auth';
import { IHeaderAction } from './models';
import { ISidebarMenuItem } from '../../interfaces/sidebar';

export interface ISidebarMenuProviderProps {
  items: ISidebarMenuItem[];
  actions?: IHeaderAction[];
  accountDropdownListItems?: IHeaderAction[];
}

const SidebarMenuProvider: FC<PropsWithChildren<ISidebarMenuProviderProps>> = ({
  actions,
  accountDropdownListItems,
  items,
  children,
}) => {
  const { anyOfPermissionsGranted } = useAuth();

  const [state, dispatch] = useReducer(SidebarMenuReducer, {
    ...SIDEBAR_MENU_CONTEXT_INITIAL_STATE,
    actions,
    accountDropdownListItems,
  });

  const getItems = () => items;

  const isItemVisible = (item: ISidebarMenuItem): boolean => {
    if (item.isHidden) return false;
    if (item.permissions && !anyOfPermissionsGranted(item.permissions)) return false;

    return item.childItems && item.childItems.length > 0
      ? item.childItems.some(childItem => isItemVisible(childItem))
      : true;
  };

  const collapse = () => {
    dispatch(toggleSidebarAction(false));
  };

  const expand = () => {
    dispatch(toggleSidebarAction(true));
  };

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <SidebarMenuStateContext.Provider value={state}>
      <SidebarMenuActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          collapse,
          expand,
          isItemVisible,
          getItems,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </SidebarMenuActionsContext.Provider>
    </SidebarMenuStateContext.Provider>
  );
};

function useSidebarMenuState() {
  const context = useContext(SidebarMenuStateContext);

  if (context === undefined) {
    throw new Error('useSidebarMenuState must be used within a SidebarMenuProvider');
  }

  return context;
}

function useSidebarMenuActions() {
  const context = useContext(SidebarMenuActionsContext);

  if (context === undefined) {
    throw new Error('useSidebarMenuActions must be used within a SidebarMenuProvider');
  }

  return context;
}

function useSidebarMenu() {
  return { ...useSidebarMenuState(), ...useSidebarMenuActions() };
}

export default SidebarMenuProvider;

export {
  IHeaderAction,
  ISidebarMenuItem,
  SidebarMenuProvider,
  useSidebarMenuState,
  useSidebarMenuActions,
  useSidebarMenu,
};
