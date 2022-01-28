import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CodeOutlined } from '@ant-design/icons';
import { FormInstance, Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React, { MutableRefObject } from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { customEventHandler } from '../utils';
import { AuthorizationSettingsDto } from '../../../../apis/authorizationSettings';

type TextType = 'text' | 'password';
export interface ITextFieldProps extends IConfigurableFormComponent {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  hideBorder?: boolean;
  initialValue?: string;
  passEmptyStringByDefault?: boolean;
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
  factory: (
    model: ITextFieldProps,
    _c: MutableRefObject<any>,
    form: FormInstance,
    settings: AuthorizationSettingsDto
  ) => {
    const inputProps: InputProps = {
      placeholder: model.placeholder,
      prefix: model.prefix,
      suffix: model.suffix,
      disabled: model.disabled,
      bordered: !model.hideBorder,
    };

    const InputComponentType = renderInput(model.textType);

    return (
      <ConfigurableFormItem model={model} initialValue={(model?.passEmptyStringByDefault && '') || model?.initialValue}>
        <InputComponentType {...inputProps} {...customEventHandler(model, form, settings)} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default TextField;
