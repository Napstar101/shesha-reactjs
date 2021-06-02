import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface ICheckboxProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const TextField: IToolboxComponent<ICheckboxProps> = {
  type: 'checkbox',
  name: 'Checkbox',
  icon: <CheckSquareOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    return (
      <FormItem model={model} valuePropName="checked">
        <Checkbox disabled={model.disabled}></Checkbox>
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default TextField;
