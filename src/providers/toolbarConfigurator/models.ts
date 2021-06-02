type ToolbarItemType = 'item' | 'group';

export type ToolbarItemProps = IToolbarButton | IButtonGroup;

type ToolbarButtonType = 'button' | 'separator' | 'line';
type ButtonActionType = 'navigate' | 'dialogue' | 'executeScript' | 'executeFormAction';

export interface IToolbarItemBase {
  id: string;
  name: string;
  tooltip?: string;
  sortOrder: number;
  type: ToolbarItemType;
}

export interface IToolbarButton extends IToolbarItemBase {
  buttonType: ToolbarButtonType;
  buttonAction?: ButtonActionType;
  targetUrl?: string;
  modalFormId?: string;
  modalTitle?: string;
  formAction?: string;
  //buttonGroup?: string;
  //title?: string;

  icon?: string;
  visibility?: string;
  permissions?: string;
}

export interface IButtonGroup extends IToolbarItemBase {
  childItems?: ToolbarItemProps[];
}
