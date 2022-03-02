import { TableOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { CollapsiblePanel } from '../../../..';
import { validateConfigurableComponentSettings } from '../../../../../formDesignerUtils';
import { IConfigurableFormComponent, IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup } from '../../../../../providers/form/models';
import ComponentsContainer from '../../../componentsContainer';
import settingsFormJson from './settingsForm.json';

export interface IChildTableComponentProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const ChildTableComponent: IToolboxComponent<IChildTableComponentProps> = {
  type: 'childTable',
  name: 'Child Table',
  icon: <TableOutlined />,
  factory: (model: IChildTableComponentProps) => {
    const {} = useForm();

    console.log('ChildTableComponent model.id :>> ', model.id);

    return (
      <CollapsiblePanel
        key={undefined}
        header={''}
        extra={<ComponentsContainer containerId={'93053321-71c5-4d96-9832-d860cac70761'} />}
      >
        <ComponentsContainer containerId={model.id} />
      </CollapsiblePanel>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => ({
    ...model,
  }),
};

export default ChildTableComponent;
