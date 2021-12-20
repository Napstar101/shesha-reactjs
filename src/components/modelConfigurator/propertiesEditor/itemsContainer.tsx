import React, { FC } from 'react';
import { ModelItem } from './modelItem';
import { useModelConfigurator } from '../../../providers';
import { ReactSortable, ItemInterface } from 'react-sortablejs';
import { IModelItem } from '../../../interfaces/modelConfigurator';
import ModelGroup from './modelGroup';

export interface IToolbarItemsSortableProps {
  index?: number[];
  items: IModelItem[];
}

export const ItemsContainer: FC<IToolbarItemsSortableProps> = props => {
  const { updateChildItems } = useModelConfigurator();

  const renderItem = (itemProps: IModelItem, index: number, key: string) => {
    if (itemProps.itemType === 'group') {
      return <ModelGroup id={index} index={[...props.index, index]} {...itemProps} key={key} />;
    } else {
      return <ModelItem id={index} index={[...props.index, index]} {...itemProps} key={key} />;
    }
  };

  const onSetList = (newState: ItemInterface[]) => {
    const listChanged = !newState.some(item => item.chosen !== null && item.chosen !== undefined);

    if (listChanged && newState?.length) {
      const newChilds = newState.map<IModelItem>(item => item as any);
      updateChildItems({ index: props.index, childs: newChilds });
    }
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
      {props.items.map((item, index) => renderItem(item, index, item?.id))}
    </ReactSortable>
  );
};
export default ItemsContainer;
