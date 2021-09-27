import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { NumberOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import FormItem from '../formItem';
import { INumberFieldProps } from './models';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

const settingsForm = settingsFormJson as FormMarkup;

const NumberField: IToolboxComponent<INumberFieldProps> = {
  type: 'numberField',
  name: 'Number field',
  icon: <NumberOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as INumberFieldProps;
    return (
      <FormItem model={model}>
        <InputNumber
          disabled={model.disabled}
          bordered={!customProps.hideBorder}
          min={customProps?.min}
          max={customProps?.max}
        />
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default NumberField;
