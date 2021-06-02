import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CodeOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface ITextFieldProps extends IConfigurableFormComponent {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  hideBorder?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const TextField: IToolboxComponent<ITextFieldProps> = {
  type: 'textField',
  name: 'Text field',
  icon: <CodeOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as ITextFieldProps;

    let inputProps: InputProps = {
      placeholder: customProps.placeholder,
      prefix: customProps.prefix,
      suffix: customProps.suffix,
      disabled: customProps.disabled,
    };
    return (
      <FormItem model={model}>
        <Input {...inputProps} bordered={!customProps.hideBorder}></Input>
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default TextField;
