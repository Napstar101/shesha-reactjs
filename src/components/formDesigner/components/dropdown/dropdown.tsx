import { FC } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup } from '../../../../providers/form/models';
import { DownSquareOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import ConfigurableFormItem from '../formItem';
import { IDropdownProps, ILabelValue } from './models';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import RefListDropDown from '../../../refListDropDown';
import { DataTypes } from '../../../../interfaces/dataTypes';

const settingsForm = settingsFormJson as FormMarkup;

const DropdownComponent: IToolboxComponent<IDropdownProps> = {
  type: 'dropdown',
  name: 'Dropdown',
  icon: <DownSquareOutlined />,
  dataTypes: [DataTypes.refListValue],
  factory: (model: IDropdownProps) => {
    return (
      <ConfigurableFormItem model={model}>
        <Dropdown {...model} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  linkToModelMetadata: (model, metadata): IDropdownProps => {
    return {
      ...model,
      label: metadata.label,
      description: metadata.description,
      dataSourceType: metadata.dataType === DataTypes.refListValue
          ? 'referenceList'
          : 'values',
      referenceListNamespace: metadata.referenceListNamespace,
      referenceListName: metadata.referenceListName,
      mode: 'single',
    };
  },
};

export const Dropdown: FC<IDropdownProps> = ({
  dataSourceType,
  values,
  onChange,
  value,
  hideBorder,
  disabled,
  referenceListNamespace,
  referenceListName,
  mode,
  defaultValue,
  ignoredValues = [],
}) => {
  const getOptions = (): ILabelValue[] => {
    return value && typeof value === 'number' ? values.map(i => ({ ...i, value: parseInt(i.value) })) : values;
  };

  const selectedMode = mode === 'single' ? undefined : mode;

  if (dataSourceType === 'referenceList') {
    return (
      <RefListDropDown.Dto
        onChange={onChange}
        listName={referenceListName}
        listNamespace={referenceListNamespace}
        disabled={disabled}
        value={value}
        bordered={!hideBorder}
        defaultValue={defaultValue}
        mode={selectedMode}
        filters={ignoredValues}
        includeFilters={false}
      />
    );
  }

  const options = getOptions() || [];

  return (
    <Select
      allowClear
      onChange={onChange}
      value={options.length > 0 ? value || defaultValue : null}
      defaultValue={defaultValue}
      bordered={!hideBorder}
      disabled={disabled}
      mode={selectedMode}
    >
      {options.map((option, index) => (
        <Select.Option key={index} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default DropdownComponent;
