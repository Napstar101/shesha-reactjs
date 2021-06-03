import { ButtonType } from 'antd/lib/button';

type ToolbarItemType = 'item' | 'group';

export type ToolbarItemProps = IToolbarButton | IButtonGroup;

type ToolbarItemSubType = 'button' | 'separator' | 'line';
type ButtonActionType = 'navigate' | 'dialogue' | 'executeScript' | 'executeFormAction';

export interface IToolbarItemBase {
  id: string;
  name: string;
  tooltip?: string;
  sortOrder: number;
  itemType: ToolbarItemType;
}

export interface IToolbarButton extends IToolbarItemBase {
  itemSubType: ToolbarItemSubType;
  buttonAction?: ButtonActionType;
  targetUrl?: string;
  modalFormId?: string;
  modalTitle?: string;
  formAction?: string;

  icon?: string;
  buttonType?: ButtonType;
  danger?: boolean;
  visibility?: string;
  permissions?: string;
}

export interface IButtonGroup extends IToolbarItemBase {
  childItems?: ToolbarItemProps[];
}
