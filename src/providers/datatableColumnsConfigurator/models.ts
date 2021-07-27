import { ButtonType } from 'antd/lib/button';

type ColumnsItemType = 'item' | 'group';

export type ColumnsItemProps = IColumnsProps | IColumnGroup;

type ColumnsItemSubType = 'button' | 'separator' | 'line';
type ButtonActionType = 'navigate' | 'dialogue' | 'executeScript' | 'executeFormAction';

export interface IColumnsBase {
  id: string;
  name: string;
  tooltip?: string;
  sortOrder: number;
  itemType: ColumnsItemType;
}

export interface IColumnsProps extends IColumnsBase {
  itemSubType: ColumnsItemSubType;
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

export interface IColumnGroup extends IColumnsBase {
  childItems?: ColumnsItemProps[];
}
