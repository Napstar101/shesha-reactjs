import { ReactNode } from 'react';
import { IToolbarButton } from '../providers/toolbarConfigurator/models';

export interface IToolbarItem extends Omit<IToolbarButton, 'id' | 'icon'> {
  id?: string;

  className?: string;

  title: ReactNode;

  icon?: ReactNode | string;

  onClick?: (args: any) => void;

  hide?: boolean;

  disabled?: boolean;

  render?: () => ReactNode;
  /**
   * @deprecated - use tooltip instead
   */
  tooltipName?: string;

  tooltip?: string;
}
