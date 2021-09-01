import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { FileOutlined } from '@ant-design/icons';

export interface IBasicDisplayFormItemProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const BasicDisplayFormItemComponent: IToolboxComponent<IBasicDisplayFormItemProps> = {
  type: 'displayFormItem',
  name: 'Display Form Item',
  icon: <FileOutlined />,
  factory: (model: IBasicDisplayFormItemProps) => {

    return (
      <FormItem model={model} initialValue="something here" className="display-form-item" />
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default BasicDisplayFormItemComponent;
