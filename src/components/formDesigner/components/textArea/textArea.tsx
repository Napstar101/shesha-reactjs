import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { FontColorsOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import ConfigurableFormItem from '../formItem';
import { TextAreaProps } from 'antd/lib/input';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../../providers';
import Show from '../../../show';
import ReadOnlyDisplayFormItem from '../../../readOnlyDisplayFormItem';

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

    const { formMode, formData } = useForm();

    const isReadOnly = model?.readOnly || formMode === 'readonly';

    const value = formData[model.name];

    return (
      <ConfigurableFormItem model={model} initialValue={(model?.passEmptyStringByDefault && '') || model?.initialValue}>
        <Show when={isReadOnly}>
          <ReadOnlyDisplayFormItem>{value}</ReadOnlyDisplayFormItem>
        </Show>
        <Show when={!isReadOnly}>
          <Input.TextArea rows={2} {...textAreaProps} />
        </Show>
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
};

export default TextField;
