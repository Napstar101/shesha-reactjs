import { FC, useMemo } from 'react';
import { Button, Tabs } from 'antd';
import { CodeEditor, SidebarContainer } from '../../';
import { ToolbarItemProperties } from './itemProperties';
import ItemsContainer from './itemsContainer';
import { useModelConfigurator } from '../../../providers';
import React from 'react';

export interface IModelConfiguratorProps { }

const { TabPane } = Tabs;

export const PropertiesEditor: FC<IModelConfiguratorProps> = () => {
  const { items, addItem, addGroup } = useModelConfigurator();

  const jsonSchema = useMemo(() => {
    return JSON.stringify(items, null, 2);
  }, [items]);

  return (
    <Tabs>
      <TabPane tab="Designer" key="1">
        <div className="sha-sidebar-configurator">
          <div className="sha-action-buttons">
            {false && (
              <Button onClick={addGroup} type="primary">
                Add Group
              </Button>
            )}
            <Button onClick={addItem} type="primary">
              Add New Property
            </Button>
          </div>
          <SidebarContainer
            rightSidebarProps={{
              open: true,
              title: 'Properties',
              content: <ToolbarItemProperties />,
            }}
          >
            <ItemsContainer items={items} index={[]} />
          </SidebarContainer>
        </div>
      </TabPane>
      <TabPane tab="Schema" key="2">
        <CodeEditor value={jsonSchema} readOnly={true} width='100%'/>
      </TabPane>
    </Tabs>

  );
};

export default PropertiesEditor;