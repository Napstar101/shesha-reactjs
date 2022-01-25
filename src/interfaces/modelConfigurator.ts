import { MetadataSourceType } from "./metadata";

export interface IModelItem {
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

    source?: MetadataSourceType;

    properties?: IModelItem[];
}