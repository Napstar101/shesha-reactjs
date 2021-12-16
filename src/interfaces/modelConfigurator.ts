import { ReactNode } from "react";

export type SidebarItemType = 'button' | 'separator' | 'group';

export interface IModelItem {
    id: string;
    title: string;
    target?: string;
    icon?: ReactNode | string;
    isHidden?: boolean;
    visibility?: string;
    requiredPermissions?: string[];
  
    childItems?: IModelItem[];
  
    selected?: boolean;    
    itemType?: SidebarItemType;
    tooltip?: string;
}