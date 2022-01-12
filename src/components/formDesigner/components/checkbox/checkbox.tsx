import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { IReadOnly, Show, useForm } from '../../../..';
import ReadOnlyDisplayFormItem from '../../../readOnlyDisplayFormItem';

export interface ICheckboxProps extends IConfigurableFormComponent, IReadOnly {}

const settingsForm = settingsFormJson as FormMarkup;

const CheckboxComponent: IToolboxComponent<ICheckboxProps> = {
  type: 'checkbox',
  name: 'Checkbox',
  icon: <CheckSquareOutlined />,
  factory: (model: ICheckboxProps) => {
    const { formMode, formData } = useForm();

    // const isReadOnly = model?.readOnly || formMode === 'readonly';

    return (
      <ConfigurableFormItem model={model} valuePropName="checked" initialValue={model?.defaultValue}>
        {/* <Show when={isReadOnly}>
          <ReadOnlyDisplayFormItem>{formData[model?.name] ? 'Yes' : 'No'}</ReadOnlyDisplayFormItem>
        </Show>

        <Show when={true}>
          <Checkbox disabled={model.disabled} />
        </Show> */}

        <Checkbox disabled={model.disabled} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default CheckboxComponent;
