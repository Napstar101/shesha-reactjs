import { ReactNode } from 'react';

type SidebarItemType = 'button' | 'separator';
type ButtonActionType = 'navigate' | 'dialogue' | 'executeScript' | 'executeFormAction';

export interface ISidebarMenuItem {
  id: string;
  name: string;
  tooltip?: string;
  sortOrder: number;
  itemType: SidebarItemType;
  buttonAction?: ButtonActionType;
  targetUrl?: string;
  icon?: string;
  isHidden?: boolean;
  visibility?: string;
  permissions?: string[];

  childItems: ISidebarMenuItem[];
}

export interface IHeaderAction {
  /**
   * the icon to render
   */
  icon?: ReactNode;

  /**
   * The text to display
   *
   * Only needed for `accountDropdownListItems`
   */
  text: string;

  /**
   * Where to navigate to when clicking the action
   */
  url?: string;

  /**
   * Click handler
   *
   * Only needed for `accountDropdownListItems`
   */
  onClick: () => void;

  /**
   * What to display as a hint
   *
   * Usually handy for `actions`
   */
  placeHolder?: ReactNode;
}
