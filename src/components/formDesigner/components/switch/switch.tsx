import { SwitcherOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import React from 'react';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../../providers';
import { DataTypes } from '../../../../interfaces/dataTypes';
import ReadOnlyDisplayFormItem from '../../../readOnlyDisplayFormItem';

export interface ISwitchProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const SwitchComponent: IToolboxComponent<ISwitchProps> = {
  type: 'switch',
  name: 'Switch',
  icon: <SwitcherOutlined />,
  dataTypeSupported: ({ dataType }) => dataType === DataTypes.boolean,
  factory: (model: ISwitchProps) => {
    const { formMode } = useForm();

    const isReadOnly = model?.readOnly || formMode === 'readonly';

    return (
      <ConfigurableFormItem model={model}>
        {isReadOnly ? <ReadOnlyDisplayFormItem type="switch" /> : <Switch />}
      </ConfigurableFormItem>
    );
  },
  initModel: model => {
    return {
      ...model,
      label: 'Switch',
    };
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default SwitchComponent;
