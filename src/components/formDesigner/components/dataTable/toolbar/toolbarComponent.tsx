import React, { FC } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { DownOutlined, DashOutlined } from '@ant-design/icons';
import ToolbarSettings from './toolbarSettingsPanel';
import { IToolbarProps } from './models';
import { Alert, Menu, Dropdown, Button } from 'antd';
import { IButtonGroup, IToolbarButton, ToolbarItemProps } from '../../../../../providers/toolbarConfigurator/models';
import { useForm, isInDesignerMode } from '../../../../../providers/form';
import { getVisibilityFunc2 } from '../../../../../providers/form/utils';
import { useDataTableSelection } from '../../../../../providers/dataTableSelection';
import { ToolbarButton } from './toolbarButton';

const ToolbarComponent: IToolboxComponent<IToolbarProps> = {
  type: 'toolbar',
  name: 'Toolbar',
  icon: <DashOutlined />,
  factory: (model: IToolbarProps) => {
    return <Toolbar {...model}></Toolbar>;
  },
  initModel: (model: IToolbarProps) => {
    return {
      ...model,
      items: [],
    };
  },
  settingsFormFactory: ({ model, onSave, onCancel, onValuesChange }) => {
    return (
      <ToolbarSettings
        model={model}
        onSave={onSave}
        onCancel={onCancel}
        onValuesChange={onValuesChange}
      />
    );
  },
};

export const Toolbar: FC<IToolbarProps> = ({ items, id }) => {
  const { formMode } = useForm();
  const { selectedRow } = useDataTableSelection();
  const isDesignMode = formMode === 'designer';

  const renderItem = (item: ToolbarItemProps, index: number) => {
    switch (item.itemType) {
      case 'item':
        const itemProps = item as IToolbarButton;

        const visibilityFunc = getVisibilityFunc2(itemProps.visibility, item.name);
        // todo: pass data and context
        if (!visibilityFunc({}, { selectedRow: selectedRow }) && !isInDesignerMode()) return null;

        switch (itemProps.itemSubType) {
          case 'button':
            return (
              <ToolbarButton formComponentId={id} key={index} selectedRow={selectedRow} {...itemProps}></ToolbarButton>
            );

          case 'separator':
            return <div key={index} className="sha-toolbar-separator"></div>;
            break;
          default:
            return null;
        }
      case 'group':
        const group = item as IButtonGroup;
        const menu = (
          <Menu>
            {group.childItems.map((childItem, idx) => (
              <Menu.Item key={idx} title={childItem.tooltip}>
                {childItem.name}
              </Menu.Item>
            ))}
          </Menu>
        );
        return (
          <Dropdown key={index} overlay={menu}>
            <Button title={item.tooltip}>
              {item.name} <DownOutlined />
            </Button>
          </Dropdown>
        );
    }
    return null;
  };

  if (items.length === 0 && isDesignMode)
    return (
      <Alert
        className="sha-designer-warning"
        message="Toolbar is empty. Press 'Customise Toolbar' button to add items"
        type="warning"
      />
    );

  return <div style={{ minHeight: '30px' }}>{items.map((item, index) => renderItem(item, index))}</div>;
};

export default ToolbarComponent;
