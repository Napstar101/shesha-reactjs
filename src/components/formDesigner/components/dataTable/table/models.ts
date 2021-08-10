import { IConfigurableFormComponent } from '../../../../../providers/form/models';
import { IConfigurableColumnsBase } from '../../../../../providers/datatableColumnsConfigurator/models';

/** Table component props */
export interface ITableComponentProps extends IConfigurableFormComponent {
  items: IConfigurableColumnsBase[];
}
