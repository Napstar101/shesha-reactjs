import { ReactNode } from 'react';

export type SidebarItemType = 'button' | 'separator' | 'group';
export type ButtonActionType = 'navigate' | 'dialogue' | 'executeScript' | 'executeFormAction';

export interface ISidebarMenuItem {
  key: string;
  title: string;
  icon?: ReactNode;
  target?: string;
  isHidden?: boolean;
  childItems?: ISidebarMenuItem[];
  tooltip?: ReactNode | string;
  type?: string;
  requiredPermissions?: string[];
}
