import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import SidebarMenuReducer from './reducer';
import {
  SidebarMenuActionsContext,
  SidebarMenuDefaultsContext,
  SidebarMenuStateContext,
  SIDEBAR_MENU_CONTEXT_INITIAL_STATE,
} from './contexts';
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
    if (item.requiredPermissions && !anyOfPermissionsGranted(item?.requiredPermissions)) return false;

    if (item.requiredPermissions?.length) {
      if (!anyOfPermissionsGranted(item?.requiredPermissions)) return false;
    }

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

function useSidebarMenuState(require: boolean) {
  const context = useContext(SidebarMenuStateContext);

  if (context === undefined && require) {
    throw new Error('useSidebarMenuState must be used within a SidebarMenuProvider');
  }

  return context;
}

function useSidebarMenuActions(require: boolean) {
  const context = useContext(SidebarMenuActionsContext);

  if (context === undefined && require) {
    throw new Error('useSidebarMenuActions must be used within a SidebarMenuProvider');
  }

  return context;
}

function useSidebarMenu(require: boolean = true) {
  return { ...useSidebarMenuState(require), ...useSidebarMenuActions(require) };
}

//#region temporary defaults provider
export interface ISidebarMenuDefaultsProviderProps {
  items: ISidebarMenuItem[];
}
const SidebarMenuDefaultsProvider: FC<PropsWithChildren<ISidebarMenuDefaultsProviderProps>> = ({ items, children }) => {
  return (
    <SidebarMenuDefaultsContext.Provider
      value={{
        items,
      }}
    >
      {children}
    </SidebarMenuDefaultsContext.Provider>
  );
};

function useSidebarMenuDefaults() {
  const context = useContext(SidebarMenuDefaultsContext);

  return context;
}

//#endregion

export {
  IHeaderAction,
  ISidebarMenuItem,
  SidebarMenuProvider,
  useSidebarMenuState,
  useSidebarMenuActions,
  useSidebarMenu,
  SidebarMenuDefaultsProvider, // note: to be removed
  useSidebarMenuDefaults, // note: to be removed
};
