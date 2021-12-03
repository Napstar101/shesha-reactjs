import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup } from '../../../../providers/form/models';
import { NumberOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import ConfigurableFormItem from '../formItem';
import { INumberFieldProps } from './models';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

const settingsForm = settingsFormJson as FormMarkup;

const NumberField: IToolboxComponent<INumberFieldProps> = {
  type: 'numberField',
  name: 'Number field',
  icon: <NumberOutlined />,
  factory: (model: INumberFieldProps) => {
    return (
      <ConfigurableFormItem model={model}>
        <InputNumber
          disabled={model.disabled}
          bordered={!model.hideBorder}
          min={model?.min}
          max={model?.max}
        />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default NumberField;
