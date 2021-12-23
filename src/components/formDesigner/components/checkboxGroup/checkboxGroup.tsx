import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { ProfileOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { DataTypes } from '../../../../interfaces/dataTypes';

export interface ICheckItem {
  id: string;
  name: string;
  value: string;
}

export interface ICheckboxGoupProps extends IConfigurableFormComponent {
  items?: ICheckItem[];
}

const settingsForm = settingsFormJson as FormMarkup;

const TextField: IToolboxComponent<ICheckboxGoupProps> = {
  type: 'checkboxGroup',
  name: 'Checkbox group',
  icon: <ProfileOutlined />,
  dataTypeSupported: ({ dataType }) => dataType === DataTypes.array,
  factory: (model: ICheckboxGoupProps) => {
    const { items = [] } = model;
    const checkItems = items.map(item => ({ label: item.name, value: item.value }));
    return (
      <ConfigurableFormItem model={model}>
        <Checkbox.Group options={checkItems}></Checkbox.Group>
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default TextField;
