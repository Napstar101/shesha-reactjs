import React, { FC } from 'react';
import ToolbarComponent from './toolboxComponent';
import { Collapse } from 'antd';
import { useLocalStorage } from '../../hooks';
import { ItemInterface, ReactSortable } from 'react-sortablejs';
import { TOOLBOX_DROPPABLE_KEY } from '../../providers/form/models';
import { useForm } from '../../providers';

export interface IProps {}

const { Panel } = Collapse;

const Toolbox: FC<IProps> = () => {
  const [openedKeys, setOpenedKeys] = useLocalStorage('shaDesigner.toolbox.openedKeys', ['']);

  const { toolboxComponentGroups } = useForm();

  const onCollapseChange = (key: string | string[]) => {
    setOpenedKeys(Array.isArray(key) ? key : [key]);
  };
  let idx = 0;
  return (
    <div className="sha-designer-toolbox">
      <Collapse activeKey={openedKeys} onChange={onCollapseChange}>
        {toolboxComponentGroups.map((group, groupIndex) => {
          const visibleComponents = group.components.filter(c => c.isHidden !== true);

          const sortableItems = visibleComponents.map<ItemInterface>(component => {
            return {
              id: component.type,
              parent_id: null,
              type: TOOLBOX_DROPPABLE_KEY,
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
                    <ToolbarComponent
                      key={`Group${groupIndex}:Component${componentIndex}`}
                      component={component}
                      index={idx}
                    ></ToolbarComponent>
                  );
                })}
              </ReactSortable>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Toolbox;
