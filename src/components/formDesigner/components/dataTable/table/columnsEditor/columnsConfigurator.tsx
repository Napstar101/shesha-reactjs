import { FC } from 'react';
import { Button } from 'antd';
import { SidebarContainer } from '../../../../../../components';
import { ColumnProperties } from './columnProperties';
import ToolbarItemsContainer from './columnsContainer';
import { useColumnsConfigurator } from '../../../../../../providers/datatableColumnsConfigurator';
import React from 'react';
import './styles/index.less';
import { TestConsumer } from '../../../../componentPropertiesPanel';

export interface IColumnsConfiguratorProps { }

export const ColumnsConfigurator: FC<IColumnsConfiguratorProps> = () => {
  const { items, addButton, addGroup } = useColumnsConfigurator();

  return (
    <div className="sha-toolbar-configurator">
      <TestConsumer></TestConsumer>
      <h4>Here you can configure columns by adjusting their settings and ordering.</h4>
      <div className="sha-action-buttons">
        {false && (
          <Button onClick={addGroup} type="primary">
            Add Group
          </Button>
        )}
        <Button onClick={addButton} type="primary">
          Add Column
        </Button>
      </div>
      <SidebarContainer
        rightSidebarProps={{
          open: true,
          title: () => 'Properties',
          content: () => <ColumnProperties></ColumnProperties>,
        }}
      >
        <ToolbarItemsContainer items={items} index={[]}></ToolbarItemsContainer>
      </SidebarContainer>
    </div>
  );
};

export default ColumnsConfigurator;
