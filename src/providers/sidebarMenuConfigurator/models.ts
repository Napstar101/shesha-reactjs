type SidebarItemType = 'button' | 'separator';
type ButtonActionType = 'navigate' | 'dialogue' | 'executeScript' | 'executeFormAction';

export interface ISidebarMenuItemProps {
  id: string;
  name: string;
  tooltip?: string;
  sortOrder: number;
  itemType: SidebarItemType;
  buttonAction?: ButtonActionType;
  targetUrl?: string;
  icon?: string;
  visibility?: string;
  permissions?: string;

  childItems: ISidebarMenuItemProps[];
}