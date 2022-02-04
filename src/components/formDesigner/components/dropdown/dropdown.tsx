import React, { FC } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup } from '../../../../providers/form/models';
import { DownSquareOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import ConfigurableFormItem from '../formItem';
import { IDropdownProps, ILabelValue } from './models';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import RefListDropDown from '../../../refListDropDown';
import { DataTypes } from '../../../../interfaces/dataTypes';
import { useForm } from '../../../..';
import ReadOnlyDisplayFormItem from '../../../readOnlyDisplayFormItem';

const settingsForm = settingsFormJson as FormMarkup;

const DropdownComponent: IToolboxComponent<IDropdownProps> = {
  type: 'dropdown',
  name: 'Dropdown',
  icon: <DownSquareOutlined />,
  dataTypeSupported: ({ dataType }) => dataType === DataTypes.referenceListItem,
  factory: (model: IDropdownProps) => {
    return (
      <ConfigurableFormItem model={model}>
        <Dropdown {...model} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customProps: IDropdownProps = {
      ...model,
      dataSourceType: 'values',
      useRawValues: false,
    };
    return customProps;
  },
  linkToModelMetadata: (model, metadata): IDropdownProps => {
    return {
      ...model,
      dataSourceType: metadata.dataType === DataTypes.referenceListItem ? 'referenceList' : 'values',
      referenceListNamespace: metadata.referenceListNamespace,
      referenceListName: metadata.referenceListName,
      mode: 'single',
      useRawValues: true,
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
  placeholder,
  useRawValues,
  readOnly,
}) => {
  const { formMode } = useForm();
  const getOptions = (): ILabelValue[] => {
    return value && typeof value === 'number' ? values?.map(i => ({ ...i, value: parseInt(i.value) })) : values;
  };

  const selectedMode = mode === 'single' ? undefined : mode;

  const isReadOnly = formMode === 'readonly' || readOnly;

  if (dataSourceType === 'referenceList') {
    return useRawValues ? (
      <RefListDropDown.Raw
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
        placeholder={placeholder}
        readOnly={isReadOnly}
      />
    ) : (
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
        placeholder={placeholder}
        readOnly={isReadOnly}
      />
    );
  }

  const options = getOptions() || [];

  const selectedValue = options.length > 0 ? value || defaultValue : null;

  const getSelectValue = () => {
    return options?.find(({ value }) => value === selectedValue)?.label;
  };

  if (isReadOnly) {
    return <ReadOnlyDisplayFormItem type="string" value={getSelectValue()} />;
  }

  return (
    <Select
      allowClear
      onChange={onChange}
      value={options.length > 0 ? value || defaultValue : null}
      defaultValue={defaultValue}
      bordered={!hideBorder}
      disabled={disabled}
      mode={selectedMode}
      placeholder={placeholder}
      showSearch
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
