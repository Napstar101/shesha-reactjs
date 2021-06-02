import { ReactNode } from 'react';

export interface IToolbarItem {
  id?: string;
  className?: string;
  title: ReactNode;
  icon?: ReactNode;
  onClick?: (args: any) => void;
  hide?: boolean;
  disabled?: boolean;
  tooltipName?: string;
}
