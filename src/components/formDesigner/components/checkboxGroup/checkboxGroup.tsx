import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { ProfileOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

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
  factory: (model: IConfigurableFormComponent) => {
    const { items = [] } = model as ICheckboxGoupProps;
    const checkItems = items.map(item => ({ label: item.name, value: item.value }));
    return (
      <FormItem model={model}>
        <Checkbox.Group options={checkItems}></Checkbox.Group>
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default TextField;
