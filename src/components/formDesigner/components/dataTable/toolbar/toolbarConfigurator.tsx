import React, { FC, ReactNode } from 'react';
import { Alert, Button } from 'antd';
import { SidebarContainer } from '../../../../../components';
import { ToolbarItemProperties } from './toolbarItemProperties';
import ToolbarItemsContainer from './toolbarItemsContainer';
import { useToolbarConfigurator } from '../../../../../providers/toolbarConfigurator';
import './styles/index.less';

export interface IToolbarConfiguratorProps {
  allowAddGroups?: boolean;
  render?: ReactNode | (() => ReactNode);
}

export const ToolbarConfigurator: FC<IToolbarConfiguratorProps> = ({ allowAddGroups = true, render }) => {
  const { items, addButton, addGroup } = useToolbarConfigurator();

  const customContent = typeof render === 'function' ? render() : render;
  const content = customContent || <ToolbarItemProperties />;

  return (
    <div className="sha-toolbar-configurator">
      <Alert message={<h4>Here you can configure the toolbar by adjusting their settings and ordering.</h4>} />

      <div className="sha-action-buttons">
        {allowAddGroups && (
          <Button onClick={addGroup} type="primary">
            Add Group
          </Button>
        )}

        <Button onClick={addButton} type="primary">
          Add New Item
        </Button>
      </div>
      <SidebarContainer
        rightSidebarProps={{
          open: true,
          title: () => 'Properties',
          content: () => content,
        }}
      >
        <ToolbarItemsContainer items={items} index={[]} />
      </SidebarContainer>
    </div>
  );
};

export default ToolbarConfigurator;
