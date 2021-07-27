import { IColumnGroup, ColumnsItemProps } from './models';

export const getItemById = (items: ColumnsItemProps[], id: string): ColumnsItemProps => {
  const position = getItemPositionById(items, id);
  return position ? position.ownerArray[position.index] : null;
  /*
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.id === id) return item;

    const childs = (item as IButtonGroup)?.childItems;
    if (childs) {
      const childItem = getItemById(childs, id);
      if (childItem) return childItem;
    }
  }
  return null;
  */
};

export interface IItemPosition {
  ownerArray: ColumnsItemProps[];
  index: number;
}
export const getItemPositionById = (items: ColumnsItemProps[], id: string): IItemPosition => {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.id === id)
      return {
        ownerArray: items,
        index,
      };

    const childs = (item as IColumnGroup)?.childItems;
    if (childs) {
      const itemPosition = getItemPositionById(childs, id);
      if (itemPosition) return itemPosition;
    }
  }
  return null;
};
