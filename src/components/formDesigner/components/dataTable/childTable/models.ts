import { ToolbarItemProps } from '../../../../../providers/toolbarConfigurator/models';

export interface IChildTableSettingsProps {
  title?: string;
  parentEntityId?: string;
  allowQuickSearch?: boolean;
  toolbarItems?: ToolbarItemProps[];
}
