export type SidebarItemType = 'button' | 'separator' | 'group';
export type ButtonActionType = 'navigate' | 'dialogue' | 'executeScript' | 'executeFormAction';

export interface ISidebarMenuItem {
  id: string;
  name: string;
  tooltip?: string;
  itemType: SidebarItemType;
  buttonAction?: ButtonActionType;
  targetUrl?: string;
  icon?: string;
  isHidden?: boolean;
  visibility?: string;
  permissions?: string[];

  childItems?: ISidebarMenuItem[];
}