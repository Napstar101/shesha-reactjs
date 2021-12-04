import React, { FC } from 'react';
import DataSourceItem from './dataSourceItem';
import { Collapse } from 'antd';
import { useLocalStorage } from '../../hooks';
import { ItemInterface, ReactSortable } from 'react-sortablejs';
import { useForm } from '../../providers';
import { TOOLBOX_DATA_ITEM_DROPPABLE_KEY } from '../../providers/form/models';

const { Panel } = Collapse;

export interface IToolboxDataSourcesProps {
    
}

export const ToolboxDataSources: FC<IToolboxDataSourcesProps> = () => {
    const [openedKeys, setOpenedKeys] = useLocalStorage('shaDesigner.toolbox.datasources.openedKeys', ['']);

    const { dataSources, activeDataSourceId } = useForm();

    const onCollapseChange = (key: string | string[]) => {
      setOpenedKeys(Array.isArray(key) ? key : [key]);
    };
    let idx = 0;    
    return (
        <Collapse activeKey={openedKeys} onChange={onCollapseChange}>
        {dataSources.map((ds, dsIndex) => {
          const visibleItems = ds.items.filter(c => c.isVisible === true);

          const sortableItems = visibleItems.map<ItemInterface>(dsItem => {
            return {
              id: dsItem.path,
              parent_id: null,
              type: TOOLBOX_DATA_ITEM_DROPPABLE_KEY,
            };
          });

          let classes = ['sha-toolbox-panel'];
          if (ds.id === activeDataSourceId) classes.push('active');

          return visibleItems.length === 0 ? null : (
            <Panel header={ds.name} key={dsIndex.toString()} className={classes.reduce((a, c) => a + ' ' + c)}>
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
                {visibleItems.map((component, componentIndex) => {
                  idx++;
                  return (
                    <DataSourceItem
                      key={`Group${dsIndex}:DsItem${componentIndex}`}
                      item={component}
                      index={idx}
                    ></DataSourceItem>
                  );
                })}
              </ReactSortable>
            </Panel>
          );
        })}
      </Collapse>
    );
}

export default ToolboxDataSources;