import { MetadataSourceType } from "./metadata";

export type SidebarItemType = 'property' | 'group';

export interface IModelItem {
    /*
    id: string;
    name: string;
  
    childItems?: IModelItem[];
  
    itemType?: SidebarItemType;
    label?: string;
    source?: MetadataSourceType;
    */
    id: string;
    /**
     * Property Name
     */
    name?: string | null;
    /**
     * Label (display name)
     */
    label?: string | null;
    /**
     * Description
     */
    description?: string | null;
    /**
     * Data type
     */
    dataType?: string | null;
    /**
     * Data format
     */
    dataFormat?: string | null;
    /**
     * Entity type. Aplicable for entity references
     */
    entityType?: string | null;
    /**
     * Reference list name
     */
    referenceListName?: string | null;
    /**
     * Reference list namespace
     */
    referenceListNamespace?: string | null;

    /** @deprecated */
    itemType?: SidebarItemType;
    source?: MetadataSourceType;

    properties?: IModelItem[];
}