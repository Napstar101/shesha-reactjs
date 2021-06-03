import React, { FC } from 'react';
import { SidebarMenuItem } from './sidebarMenuItem';
import { useSidebarMenuConfigurator } from '../../../providers/sidebarMenuConfigurator';
import { ISidebarMenuItemProps } from '../../../providers/sidebarMenuConfigurator/models';
import { ReactSortable, ItemInterface } from 'react-sortablejs';

export interface IToolbarItemsSortableProps {
  index?: number[];
  items: ISidebarMenuItemProps[];
}

export const SidebarItemsContainer: FC<IToolbarItemsSortableProps> = props => {
  const { updateChildItems } = useSidebarMenuConfigurator();

  const renderItem = (itemProps: ISidebarMenuItemProps, index: number) => {
    return (
      <SidebarMenuItem 
        key={index} 
        index={[...props.index, index]} 
        {...itemProps}>
      </SidebarMenuItem>
    );
  };

  const onSetList = (newState: ItemInterface[], _sortable, _store) => {
    const listChanged = !newState.some(item => item.chosen !== null && item.chosen !== undefined);

    if (listChanged) {
      const newChilds = newState.map<ISidebarMenuItemProps>(item => item as ISidebarMenuItemProps);
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
      draggable=".sha-sidebar-item"
      animation={75}
      ghostClass="sha-sidebar-item-ghost"
      emptyInsertThreshold={20}
      handle=".sha-sidebar-item-drag-handle"
      scroll={true}
      bubbleScroll={true}
    >
      {props.items.map(
        (item, index) => renderItem(item, index)
      )}
    </ReactSortable>
  );
};
export default SidebarItemsContainer;
