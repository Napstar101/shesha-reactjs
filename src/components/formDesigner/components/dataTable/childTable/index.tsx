import { TableOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
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

    return <ComponentsContainer containerId={model.id} />;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => ({
    ...model,
  }),
};

export default ChildTableComponent;
