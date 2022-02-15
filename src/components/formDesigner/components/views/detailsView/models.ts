import { IToolbarItem } from '../../../../..';

export interface IDetailsViewProps {
  title?: string;
  path: string;
  backUrl?: string;
  statusName?: string;
  statusColor?: string;
  toolbarItems?: IToolbarItem[];
}
