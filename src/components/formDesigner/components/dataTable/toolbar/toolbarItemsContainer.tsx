import { FC } from 'react';
import { ToolbarItem } from './toolbarItem';
import { ToolbarItemsGroup } from './toolbarItemsGroup';
import { useToolbarConfigurator } from '../../../../../providers/toolbarConfigurator';
import { IButtonGroup, IToolbarButton, ToolbarItemProps } from '../../../../../providers/toolbarConfigurator/models';
import { ReactSortable, ItemInterface } from 'react-sortablejs';
import React from 'react';

export interface IToolbarItemsSortableProps {
  index?: number[];
  items: ToolbarItemProps[];
}

export const ToolbarItemsContainer: FC<IToolbarItemsSortableProps> = props => {
  const { updateChildItems } = useToolbarConfigurator();

  const renderItem = (item: ToolbarItemProps, index: number) => {
    switch (item.type) {
      case 'item':
        const itemProps = item as IToolbarButton;
        return <ToolbarItem key={index} index={[...props.index, index]} {...itemProps}></ToolbarItem>;

      case 'group':
        const groupProps = item as IButtonGroup;
        return <ToolbarItemsGroup key={index} {...groupProps} index={[...props.index, index]}></ToolbarItemsGroup>;
    }
  };

  const onSetList = (newState: ItemInterface[], _sortable, _store) => {
    const listChanged = !newState.some(item => item.chosen !== null && item.chosen !== undefined);

    if (listChanged) {
      const newChilds = newState.map<ToolbarItemProps>(item => item as ToolbarItemProps);
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
        // <ConfigurableComponent id={c.id} index={index} key={c.id}></ConfigurableComponent>
      )}
    </ReactSortable>
  );
};
export default ToolbarItemsContainer;
