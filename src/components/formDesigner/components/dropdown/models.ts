import { IConfigurableFormComponent } from '../../../../providers/form/models';

export type DataSourceType = 'values' | 'referenceList' | 'entityList' | 'url';

export interface ILabelValue<TValue = any> {
  id: string;
  label: string;
  value: TValue;
}

export interface IDropdownProps extends IConfigurableFormComponent {
  dataSourceType: DataSourceType;
  values?: ILabelValue[];
  referenceListNamespace?: string;
  referenceListName?: string;
  value?: any;
  onChange?: any;
  hideBorder?: boolean;
  mode?: 'multiple' | 'tags';
}
