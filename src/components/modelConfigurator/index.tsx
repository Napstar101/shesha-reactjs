import { FC } from 'react';
import { Button } from 'antd';
import { SidebarContainer } from '../../';
import { ToolbarItemProperties } from './itemProperties';
import SidebarItemsContainer from './sidebarItemsContainer';
import { useModelConfigurator } from '../../providers/modelConfigurator';
import React from 'react';
//import '../styles/index.less';

export interface IModelConfiguratorProps { }

export const ModelConfigurator: FC<IModelConfiguratorProps> = () => {
  const { items, addItem, addGroup } = useModelConfigurator();

  return (
    <div className="sha-sidebar-configurator">
      <div className="sha-action-buttons">
        {false && (
          <Button onClick={addGroup} type="primary">
            Add Group
          </Button>
        )}
        <Button onClick={addItem} type="primary">
          Add New Item
        </Button>
      </div>
      <SidebarContainer
        rightSidebarProps={{
          open: true,
          title: 'Properties',
          content: <ToolbarItemProperties />,
        }}
      >
        <SidebarItemsContainer items={items} index={[]} />
      </SidebarContainer>
    </div>
  );
};

export default ModelConfigurator;