import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup } from '../../../../providers/form/models';
import { NumberOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import ConfigurableFormItem from '../formItem';
import { INumberFieldProps } from './models';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { DataTypes } from '../../../../interfaces/dataTypes';

const settingsForm = settingsFormJson as FormMarkup;

const NumberField: IToolboxComponent<INumberFieldProps> = {
  type: 'numberField',
  name: 'Number field',
  icon: <NumberOutlined />,
  dataTypes: [DataTypes.int32, DataTypes.int64, DataTypes.double, DataTypes.float],
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
  linkToModelMetadata: (model, metadata): INumberFieldProps => {
    return {
      ...model,
      label: metadata.label,
      description: metadata.description,
      min: metadata.min,
      max: metadata.max,
      // todo: add decimal points and format
    };
  },
};

export default NumberField;
