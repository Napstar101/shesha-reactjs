import { FC } from 'react';
import { Button } from 'antd';
import { SidebarContainer } from '../../../../../components';
import { ToolbarItemProperties } from './toolbarItemProperties';
import ToolbarItemsContainer from './toolbarItemsContainer';
import { useToolbarConfigurator } from '../../../../../providers/toolbarConfigurator';
import React from 'react';
import './styles/index.less';

export interface IToolbarConfiguratorProps {}

export const ToolbarConfigurator: FC<IToolbarConfiguratorProps> = () => {
  const { items, addButton, addGroup } = useToolbarConfigurator();

  return (
    <div className="sha-toolbar-configurator">
      <h4>Here you can configure the toolbar by adjusting their settings and ordering.</h4>
      <div className="sha-action-buttons">
        <Button onClick={addGroup} type="primary">
          Add Group
        </Button>
        <Button onClick={addButton} type="primary">
          Add New Item
        </Button>
      </div>
      <SidebarContainer
        rightSidebarProps={{
          open: true,
          title: () => 'Properties',
          content: () => <ToolbarItemProperties></ToolbarItemProperties>,
        }}
      >
        <ToolbarItemsContainer items={items} index={[]}></ToolbarItemsContainer>
      </SidebarContainer>
    </div>
  );
};

export default ToolbarConfigurator;
