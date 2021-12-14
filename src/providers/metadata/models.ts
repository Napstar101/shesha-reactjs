export interface IProperty {
    name: string;
    displayName: string;
    description?: string;
}

export interface IPropertyMetadata {
    path: string;
    label?: string;
    description?: string;
  
    isVisible: boolean;
    readonly: boolean;
    orderIndex?: number;
    groupName?: string;
  
    //#region data type
    dataType: string;
    entityType?: string;
    referenceListName?: string;
    referenceListNamespace?: string;
    //#endregion
  
    //#region validation
    required: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    isEmail: boolean;
    //#endregion
  }