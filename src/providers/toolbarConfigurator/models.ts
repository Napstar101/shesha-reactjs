import { ButtonType } from 'antd/lib/button';

type ToolbarItemType = 'item' | 'group';

export type ToolbarItemProps = IToolbarButton | IButtonGroup;

type ToolbarItemSubType = 'button' | 'separator' | 'line';
type ButtonActionType =
  | 'navigate'
  | 'dialogue'
  | 'executeScript'
  | 'executeFormAction'
  | 'submit'
  | 'reset'
  | 'startFormEdit'
  | 'cancelFormEdit';

export interface IToolbarItemBase {
  id: string;
  name: string;
  tooltip?: string;
  sortOrder: number;
  danger?: boolean;
  itemType: ToolbarItemType;
  icon?: string;
  buttonType?: ButtonType;
  customVisibility?: string;
  customEnabled?: string;
  permissions?: string[];
}

export interface IToolbarButton extends IToolbarItemBase {
  itemSubType: ToolbarItemSubType;
  buttonAction?: ButtonActionType;
  refreshTableOnSuccess?: boolean;
  targetUrl?: string;
  modalFormId?: string;
  modalTitle?: string;
  modalWidth?: number;
  formAction?: string;
  actionScript?: string;
}

export interface IButtonGroup extends IToolbarItemBase {
  childItems?: ToolbarItemProps[];
}
