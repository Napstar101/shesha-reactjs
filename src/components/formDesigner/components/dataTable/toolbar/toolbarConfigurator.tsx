import React, { FC } from 'react';
import { Alert, Button, Divider } from 'antd';
import { SidebarContainer } from '../../../../../components';
import { ToolbarItemProperties } from './toolbarItemProperties';
import ToolbarItemsContainer from './toolbarItemsContainer';
import { useToolbarConfigurator } from '../../../../../providers/toolbarConfigurator';
import './styles/index.less';

export interface IToolbarConfiguratorProps {}

export const ToolbarConfigurator: FC<IToolbarConfiguratorProps> = () => {
  const { items, addButton, addGroup } = useToolbarConfigurator();

  console.log('ToolbarConfigurator items :>> ', items);

  return (
    <div className="sha-toolbar-configurator">
      <Alert message={<h4>Here you can configure the toolbar by adjusting their settings and ordering.</h4>} />
      <br />
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
          content: () => <ToolbarItemProperties />,
        }}
      >
        <ToolbarItemsContainer items={items} index={[]} />
      </SidebarContainer>
    </div>
  );
};

export default ToolbarConfigurator;
