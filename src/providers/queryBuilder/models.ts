import { FieldSettings } from 'react-awesome-query-builder';

//Fields

export type CustomFieldSettings = {
  typeShortAlias?: string;
  referenceListName?: string;
  referenceListNamespace?: string;
  allowInherited?: boolean;
};

export interface IProperty {
  label: string;
  propertyName: string;
  dataType: string;
  visible: boolean;
  fieldSettings?: FieldSettings | CustomFieldSettings;
  preferWidgets?: string[];
  childProperties?: IProperty[];
}
