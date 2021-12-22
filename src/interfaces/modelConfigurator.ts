import { MetadataSourceType } from "./metadata";

export type SidebarItemType = 'property' | 'group';

export interface IModelItem {
    id: string;
    name: string;
  
    childItems?: IModelItem[];
  
    itemType?: SidebarItemType;
    label?: string;
    source?: MetadataSourceType;
}