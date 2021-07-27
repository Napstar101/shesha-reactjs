import { ReactNode } from 'react';

export interface ISidebarMenuItem {
  key: string;
  title: string;
  icon?: ReactNode;
  target?: string;
  isHidden?: boolean;
  childItems?: ISidebarMenuItem[];
  requiredPermissions?: string[];
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
