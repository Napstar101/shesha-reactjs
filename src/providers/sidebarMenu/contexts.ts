import { createContext } from 'react';
import { IFlagsSetters } from '../../interfaces/flagsSetters';
import { IFlagsState } from '../../interfaces/flagsState';
import { IHeaderAction, ISidebarMenuItem } from './models';

export type IFlagProgressFlags = 'fetchFileInfo' /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags = 'fetchFileInfo' /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags = 'fetchFileInfo' /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags = '__DEFAULT__' /* NEW_ACTIONED_FLAG_GOES_HERE */;

export interface ISidebarMenuStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  items: ISidebarMenuItem[];
  isExpanded: boolean;
  actions?: IHeaderAction[];
  accountDropdownListItems?: IHeaderAction[];
}

export interface ISidebarMenuActionsContext
  extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  expand: () => void;
  collapse: () => void;
  isItemVisible: (item: ISidebarMenuItem) => boolean;
  /* NEW_ACTION_ACTION_DECLARATION_GOES_HERE */
}

export const SIDEBAR_MENU_CONTEXT_INITIAL_STATE: ISidebarMenuStateContext = {
  isInProgress: {},
  succeeded: {},
  error: {},
  actioned: {},
  items: [],
  isExpanded: false,
};

export const SidebarMenuStateContext = createContext<ISidebarMenuStateContext>(SIDEBAR_MENU_CONTEXT_INITIAL_STATE);

export const SidebarMenuActionsContext = createContext<ISidebarMenuActionsContext>(undefined);
