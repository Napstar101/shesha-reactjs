import React, { FC } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { HomeOutlined } from '@ant-design/icons';
import { InputProps } from 'antd/lib/input';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { AutoCompletePlaces } from '../../../';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../..';

export interface IAddressCompomentProps extends IConfigurableFormComponent {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  hideBorder?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const AddressCompoment: IToolboxComponent<IAddressCompomentProps> = {
  type: 'address',
  name: 'Address',
  icon: <HomeOutlined />,
  factory: (model: IAddressCompomentProps) => {
    const { formMode } = useForm();

    const completeModel = model;
    completeModel.readOnly = model?.readOnly || formMode === 'readonly';

    return (
      <ConfigurableFormItem model={model}>
        <AutoCompletePlacesField {...completeModel} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

interface IAutoCompletePlacesFieldProps extends IAddressCompomentProps {
  value?: any;
  onChange?: any;
}

const AutoCompletePlacesField: FC<IAutoCompletePlacesFieldProps> = props => {
  const inputProps: InputProps = {
    placeholder: props.placeholder,
    prefix: props.prefix,
    suffix: props.suffix,
    disabled: props.disabled,
    bordered: !props.hideBorder,
    readOnly: props.readOnly,
  };

  return (
    <AutoCompletePlaces
      className="search-input text-center"
      value={props.value}
      onChange={props.onChange}
      {...inputProps}
    />
  );
};

export default AddressCompoment;
