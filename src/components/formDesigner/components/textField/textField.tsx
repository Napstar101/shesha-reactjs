import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CodeOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

type TextType = 'text' | 'password';
export interface ITextFieldProps extends IConfigurableFormComponent {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  hideBorder?: boolean;
  textType?: TextType;
}

const settingsForm = settingsFormJson as FormMarkup;

const renderInput = (type: TextType) => {
  switch (type) {
    case 'password':
      return Input.Password;
    default:
      return Input;
  }
};

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
      bordered: !customProps.hideBorder,
    };

    const InputComponentType = renderInput(customProps.textType);

    return (
      <ConfigurableFormItem model={model}>
        <InputComponentType {...inputProps} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default TextField;
