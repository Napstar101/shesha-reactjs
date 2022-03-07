import { IConfigurableFormComponent } from '../../../../../providers/form/models';
import { IConfigurableColumnsBase } from '../../../../../providers/datatableColumnsConfigurator/models';

export interface ITableComponentBaseProps {
  items: IConfigurableColumnsBase[];
  useMultiselect: boolean;
  crud: boolean;
  crudMode?: 'inline' | 'dialog';
  overrideDefaultCrudBehavior?: boolean;
  editUrl?: string;
  deleteUrl?: boolean;
  updateUrl?: boolean;
}

/** Table component props */
export interface ITableComponentProps extends ITableComponentBaseProps, IConfigurableFormComponent {}
