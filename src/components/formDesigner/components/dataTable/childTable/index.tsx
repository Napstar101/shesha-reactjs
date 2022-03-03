import { TableOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { CollapsiblePanel, GlobalTableFilter } from '../../../..';
import { validateConfigurableComponentSettings } from '../../../../../formDesignerUtils';
import { IConfigurableFormComponent, IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup } from '../../../../../providers/form/models';
import ComponentsContainer from '../../../componentsContainer';
import { ToolbarWithProvider } from '../toolbar/toolbarComponent';
import { IChildTableSettingsProps } from './models';
import ChildDataTableSettings from './settings';
import settingsFormJson from './settingsForm.json';
import './styles/index.less';

export interface IChildTableComponentProps extends IChildTableSettingsProps, IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const ChildTableComponent: IToolboxComponent<IChildTableComponentProps> = {
  type: 'childTable',
  name: 'Child Table',
  icon: <TableOutlined />,
  factory: (model: IChildTableComponentProps) => {
    const {} = useForm();

    return (
      <CollapsiblePanel
        key={undefined}
        header="This is the heading"
        extra={
          <div>
            <Space size="middle">
              <GlobalTableFilter />

              <ToolbarWithProvider items={model?.toolbarItems || []} name={''} type={''} id={model.id} />
            </Space>
          </div>
        }
        noContentPadding
        className="sha-form-designer-child-table"
      >
        <ComponentsContainer containerId={model.id} />
      </CollapsiblePanel>
    );
  },
  // settingsFormMarkup: settingsForm,
  settingsFormFactory: ({ model, onSave, onCancel, onValuesChange }) => {
    return (
      <ChildDataTableSettings
        model={(model as unknown) as IChildTableSettingsProps}
        onSave={onSave as any}
        onCancel={onCancel}
        onValuesChange={onValuesChange as any}
      />
    );
  },
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => ({
    ...model,
  }),
};

export default ChildTableComponent;
