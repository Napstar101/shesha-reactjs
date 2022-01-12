import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../../providers';

export interface ICheckItem {
  id: string;
  name: string;
  value: string;
}

export type DataSourceType = 'values' | 'reflist';

export interface IRadioProps extends IConfigurableFormComponent {
  items?: ICheckItem[];
  dataSourceType: DataSourceType;
}

const settingsForm = settingsFormJson as FormMarkup;

const TextField: IToolboxComponent<IRadioProps> = {
  type: 'radio',
  name: 'Radio',
  icon: <CheckCircleOutlined />,
  factory: (model: IRadioProps) => {
    const { items = [] } = model;

    const { formMode } = useForm();

    const isReadOnly = model?.readOnly || formMode === 'readonly';

    return (
      <ConfigurableFormItem model={model}>
        <Radio.Group disabled={isReadOnly}>
          {items.map((checkItem, index) => (
            <Radio key={index} value={checkItem.value}>
              {checkItem.name}
            </Radio>
          ))}
        </Radio.Group>
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customModel: IRadioProps = {
      ...model,
      dataSourceType: 'values',
    };
    return customModel;
  },
};

export default TextField;
