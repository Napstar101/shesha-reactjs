import React, { FC } from 'react';
import ConfigurableFormComponent from './configurableFormComponent';
import { useFormActions, useFormState } from '../../providers/form';
import { TOOLBOX_COMPONENT_DROPPABLE_KEY, TOOLBOX_DATA_ITEM_DROPPABLE_KEY } from '../../providers/form/models';
import { ItemInterface, ReactSortable } from 'react-sortablejs';

export type Direction = 'horizontal' | 'vertical';
export interface IProps {
  containerId: string;
  direction?: Direction;
  justifyContent?: string;
  className?: string;
}
const ComponentsContainer: FC<IProps> = ({
  containerId,
  children,
  direction = 'vertical',
  justifyContent,
  className,
}) => {
  const {
    getChildComponents,
    updateChildComponents,
    addComponent,
    addDataProperty,
    startDragging,
    endDragging,
  } = useFormActions();
  const { formMode } = useFormState();
  const isDesignerMode = formMode === 'designer';

  console.log('ComponentsContainer props: ', {
    containerId,
    children,
    direction,
    justifyContent,
    className,
  });

  const components = getChildComponents(containerId);

  const componentsMapped = components.map<ItemInterface>(c => ({
    id: c.id,
  }));

  const onSetList = (newState: ItemInterface[], _sortable, _store) => {
    const listChanged = !newState.some(item => item.chosen !== null && item.chosen !== undefined);

    if (listChanged) {
      const newDataItemIndex = newState.findIndex(item => item['type'] == TOOLBOX_DATA_ITEM_DROPPABLE_KEY);
      if (newDataItemIndex > -1) {
        // dropped data item
        const draggedItem = newState[newDataItemIndex];

        addDataProperty({
          propertyMetadata: draggedItem.metadata,
          containerId: containerId,
          index: newDataItemIndex,
        });
      } else {
        const newComponentIndex = newState.findIndex(item => item['type'] == TOOLBOX_COMPONENT_DROPPABLE_KEY);
        if (newComponentIndex > -1) {
          // add new component
          const toolboxComponent = newState[newComponentIndex];

          addComponent({
            containerId: containerId,
            componentType: toolboxComponent.id.toString(),
            index: newComponentIndex,
          });
        } else {
          // reorder existing components
          const newIds = newState.map<string>(item => item.id.toString());
          updateChildComponents({ containerId: containerId, componentIds: newIds });
        }
      }
    }
    return;
  };

  const onDragStart = () => {
    startDragging();
  };

  const onDragEnd = _evt => {
    endDragging();
  };

  const renderComponents = () => {
    return components.map((c, index) => (
      <ConfigurableFormComponent id={c.id} index={index} key={c.id}></ConfigurableFormComponent>
    ));
  };

  let style = {};
  if (direction === 'horizontal' && justifyContent) style['justifyContent'] = justifyContent;

  return (
    <div className={`sha-components-container ${direction} ${className}`}>
      {isDesignerMode ? (
        <>
          {components.length == 0 && <div className="sha-drop-hint">Drag and Drop form component</div>}

          <ReactSortable
            disabled={!isDesignerMode}
            onStart={onDragStart}
            onEnd={onDragEnd}
            list={componentsMapped}
            setList={onSetList}
            fallbackOnBody={true}
            swapThreshold={0.5}
            group={{
              name: 'shared',
            }}
            sort={true}
            draggable=".sha-component"
            animation={75}
            ghostClass="sha-component-ghost"
            emptyInsertThreshold={20}
            handle=".sha-component-drag-handle"
            scroll={true}
            bubbleScroll={true}
            direction={direction}
            className={`sha-components-container-inner`}
            style={style}
            /* note: may be used form horizontal containers like toolbar or action buttons
      direction={(evt: SortableEvent, _target: HTMLElement, _dragEl: HTMLElement) => {
        const insideColumn = evt.target.className.includes('sha-designer-column');
        return insideColumn
          ? 'horizontal'
          : 'vertical';
      }}
      */
          >
            {renderComponents()}
          </ReactSortable>
        </>
      ) : (
        <div className="sha-components-container-inner" style={style}>
          {renderComponents()}
        </div>
      )}
      {children}
    </div>
  );
};

export default ComponentsContainer;
