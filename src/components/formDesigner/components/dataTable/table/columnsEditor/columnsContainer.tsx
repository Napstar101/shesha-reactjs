import { FC } from 'react';
import { Column } from './column';
import { ColumnsGroup } from './columnsGroup';
import { useColumnsConfigurator } from '../../../../../../providers/datatableColumnsConfigurator';
import { IColumnGroup, IColumnsProps, IColumnsBase } from '../../../../../../providers/datatableColumnsConfigurator/models';
import { ReactSortable, ItemInterface } from 'react-sortablejs';
import React from 'react';

export interface IToolbarItemsSortableProps {
  index?: number[];
  items: IColumnsBase[];
}

export const ToolbarItemsContainer: FC<IToolbarItemsSortableProps> = props => {
  const { updateChildItems } = useColumnsConfigurator();

  const renderItem = (item: IColumnsBase, index: number) => {
    switch (item.itemType) {
      case 'item':
        const itemProps = item as IColumnsProps;
        return <Column key={index} index={[...props.index, index]} {...itemProps}></Column>;

      case 'group':
        const groupProps = item as IColumnGroup;
        return <ColumnsGroup key={index} {...groupProps} index={[...props.index, index]}></ColumnsGroup>;
    }
  };

  const onSetList = (newState: ItemInterface[], _sortable, _store) => {
    const listChanged = !newState.some(item => item.chosen !== null && item.chosen !== undefined);

    if (listChanged) {
      const newChilds = newState.map<IColumnsBase>(item => item as IColumnsBase);
      updateChildItems({ index: props.index, childs: newChilds });
    }
    return;
  };

  return (
    <ReactSortable
      // onStart={onDragStart}
      // onEnd={onDragEnd}
      list={props.items}
      setList={onSetList}
      fallbackOnBody={true}
      swapThreshold={0.5}
      group={{
        name: 'toolbarItems',
      }}
      sort={true}
      draggable=".sha-toolbar-item"
      animation={75}
      ghostClass="sha-toolbar-item-ghost"
      emptyInsertThreshold={20}
      handle=".sha-toolbar-item-drag-handle"
      scroll={true}
      bubbleScroll={true}
    >
      {props.items.map(
        (item, index) => renderItem(item, index)
      )}
    </ReactSortable>
  );
};
export default ToolbarItemsContainer;
