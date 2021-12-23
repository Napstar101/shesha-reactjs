import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { FontColorsOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import ConfigurableFormItem from '../formItem';
import { TextAreaProps } from 'antd/lib/input';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { DataTypes, StringFormats } from '../../../../interfaces/dataTypes';

export interface ITextAreaProps extends IConfigurableFormComponent {
  placeholder?: string;
  showCount: boolean;
  autoSize: boolean;
  maxLength?: number;
  allowClear: boolean;
  hideBorder?: boolean;
  initialValue?: string;
  passEmptyStringByDefault?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const TextField: IToolboxComponent<ITextAreaProps> = {
  type: 'textArea',
  name: 'Text Area',
  icon: <FontColorsOutlined />,
  dataTypeSupported: ({ dataType, dataFormat }) => dataType === DataTypes.string && dataFormat === StringFormats.multiline,
  factory: (model: ITextAreaProps) => {
    const textAreaProps: TextAreaProps = {
      placeholder: model.placeholder,
      disabled: model.disabled,
      autoSize: model.autoSize ? { minRows: 2 } : false,
      showCount: model.showCount,
      maxLength: model.maxLength,
      allowClear: model.allowClear,
      bordered: !model.hideBorder,
    };

    return (
      <ConfigurableFormItem
        model={model}
        initialValue={(model?.passEmptyStringByDefault && '') || model?.initialValue}
      >
        <Input.TextArea rows={2} {...textAreaProps} />
      </ConfigurableFormItem>
    );
  },
  initModel: model => {
    const textAreaModel: ITextAreaProps = {
      ...model,
      label: 'Text Area',
      autoSize: false,
      showCount: false,
      allowClear: false,
    };

    return textAreaModel;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  linkToModelMetadata: (model, metadata): ITextAreaProps => {
    return {
      ...model,
      label: metadata.label,
      description: metadata.description,
      maxLength: metadata.maxLength,
    };
  },
};

export default TextField;
