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
    dataFormat: string;
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
    //isEmail: boolean;
    //#endregion
  }

  export enum DataTypes {
    string = 'string',
    date = 'date',
    datetime = 'datetime',
    time = 'time',
    entity = 'entity',
    file = 'file',
    number = 'number',
    reflist = 'reflist',
    boolean = 'boolean',
    list = 'list',
  }

  export interface IModelMetadata {
    type: string;
    name?: string;
    description?: string;
    properties: IPropertyMetadata[];
  }