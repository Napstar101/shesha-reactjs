import React, { FC } from 'react';
import { TableView } from './tableView';
import { useTableViewSelectorConfigurator } from '../../../../../providers/tableViewSelectorConfigurator';
import { ITableViewProps } from '../../../../../providers/tableViewSelectorConfigurator/models';
import { ReactSortable, ItemInterface } from 'react-sortablejs';

export interface IToolbarItemsSortableProps {
  index?: number[];
  items: ITableViewProps[];
}

export const ToolbarItemsContainer: FC<IToolbarItemsSortableProps> = props => {
  const { updateChildItems } = useTableViewSelectorConfigurator();

  const onSetList = (newState: ItemInterface[], _sortable, _store) => {
    const listChanged = !newState.some(item => item.chosen !== null && item.chosen !== undefined);

    if (listChanged) {
      const newChilds = newState.map<ITableViewProps>(item => item as ITableViewProps);
      updateChildItems({ index: props.index, childs: newChilds });
    }
    return;
  };

  return (
    <ReactSortable
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
      {props.items.map((item, index) => (
        <TableView index={[index]} key={index} {...item} />
      ))}
    </ReactSortable>
  );
};
export default ToolbarItemsContainer;
