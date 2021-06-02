import { SwitcherOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import React from 'react';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface ISwitchProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const SwitchComponent: IToolboxComponent<ISwitchProps> = {
  type: 'switch',
  name: 'Switch',
  icon: <SwitcherOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    return (
      <FormItem model={model}>
        <Switch defaultChecked disabled={model.disabled} />
      </FormItem>
    );
  },
  initModel: model => {
    return {
      ...model,
      label: 'Switch',
    };
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default SwitchComponent;
