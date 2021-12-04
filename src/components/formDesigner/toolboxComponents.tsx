import React, { FC } from 'react';
import ToolboxComponent from './toolboxComponent';
import { Collapse } from 'antd';
import { useLocalStorage } from '../../hooks';
import { ItemInterface, ReactSortable } from 'react-sortablejs';
import { useForm } from '../../providers';
import { TOOLBOX_COMPONENT_DROPPABLE_KEY } from '../../providers/form/models';

const { Panel } = Collapse;

export interface IToolboxComponentsProps {
    
}

export const ToolboxComponents: FC<IToolboxComponentsProps> = () => {
    const [openedKeys, setOpenedKeys] = useLocalStorage('shaDesigner.toolbox.components.openedKeys', ['']);

    const { toolboxComponentGroups } = useForm();
  
    const onCollapseChange = (key: string | string[]) => {
      setOpenedKeys(Array.isArray(key) ? key : [key]);
    };
    let idx = 0;    
    return (
        <Collapse activeKey={openedKeys} onChange={onCollapseChange} accordion>
        {toolboxComponentGroups.map((group, groupIndex) => {
          const visibleComponents = group.components.filter(c => c.isHidden !== true);

          const sortableItems = visibleComponents.map<ItemInterface>(component => {
            return {
              id: component.type,
              parent_id: null,
              type: TOOLBOX_COMPONENT_DROPPABLE_KEY,
            };
          });

          return visibleComponents.length === 0 ? null : (
            <Panel header={group.name} key={groupIndex.toString()}>
              <ReactSortable
                list={sortableItems}
                setList={() => {}}
                group={{
                  name: 'shared',
                  pull: 'clone',
                  put: false,
                }}
                sort={false}
                draggable=".sha-toolbox-component"
                ghostClass="sha-component-ghost"
              >
                {visibleComponents.map((component, componentIndex) => {
                  idx++;
                  return (
                    <ToolboxComponent
                      key={`Group${groupIndex}:Component${componentIndex}`}
                      component={component}
                      index={idx}
                    ></ToolboxComponent>
                  );
                })}
              </ReactSortable>
            </Panel>
          );
        })}
      </Collapse>
    );
}

export default ToolboxComponents;