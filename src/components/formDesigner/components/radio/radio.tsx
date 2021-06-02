import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

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
  factory: (model: IConfigurableFormComponent) => {
    const { items = [] } = model as IRadioProps;
    return (
      <FormItem model={model}>
        <Radio.Group>
          {items.map((checkItem, index) => (
            <Radio key={index} value={checkItem.value}>
              {checkItem.name}
            </Radio>
          ))}
        </Radio.Group>
      </FormItem>
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
