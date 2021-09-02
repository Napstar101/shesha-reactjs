import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { FileOutlined } from '@ant-design/icons';
import { useForm } from '../../../../providers';
import _ from 'lodash';

export interface IBasicDisplayFormItemProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const BasicDisplayFormItemComponent: IToolboxComponent<IBasicDisplayFormItemProps> = {
  type: 'displayFormItem',
  name: 'Display Form Item',
  icon: <FileOutlined />,
  factory: (model: IBasicDisplayFormItemProps) => {
    const { formData } = useForm();

    return (
      <FormItem model={model} className="display-form-item">
        <span>{_.get(formData, model?.name)}</span>
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default BasicDisplayFormItemComponent;
