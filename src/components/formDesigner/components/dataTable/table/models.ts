import { IConfigurableFormComponent } from '../../../../../providers/form/models';
import { IColumnsBase } from '../../../../../providers/datatableColumnsConfigurator/models';

export interface ITableProps extends IConfigurableFormComponent {
  items: IColumnsBase[];
}
