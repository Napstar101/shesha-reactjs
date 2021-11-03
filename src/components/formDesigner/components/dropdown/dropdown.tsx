import { FC, useEffect } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { DownSquareOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import ConfigurableFormItem from '../formItem';
import { IDropdownProps, ILabelValue } from './models';
import settingsFormJson from './settingsForm.json';
import { useReferenceListGetItems } from '../../../../apis/referenceList';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { RefListDropDown } from '../../..';

const settingsForm = settingsFormJson as FormMarkup;

const DropdownComponent: IToolboxComponent<IDropdownProps> = {
  type: 'dropdown',
  name: 'Dropdown',
  icon: <DownSquareOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as IDropdownProps;
    return (
      <ConfigurableFormItem model={model}>
        <Dropdown {...customProps} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
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
  // todo: implement referencelist provider with cache support and promise result
  const { refetch: refListFetch, loading: refListLoading, data: refListItems } = useReferenceListGetItems({
    lazy: true,
  });

  useEffect(() => {
    if (dataSourceType === 'referenceList' && referenceListNamespace && referenceListName)
      refListFetch({ queryParams: { namespace: referenceListNamespace, name: referenceListName } });
  }, [dataSourceType, referenceListNamespace, referenceListName]);

  const getOptions = (): ILabelValue[] => {
    switch (dataSourceType) {
      case 'values': {
        return value && typeof value === 'number' ? values.map(i => ({ ...i, value: parseInt(i.value) })) : values;
      }
      case 'referenceList': {
        let items = refListItems?.result;

        if (ignoredValues?.length) {
          items = items?.filter(({ itemValue }) => !ignoredValues?.includes(itemValue));
        }

        return items ? items.map<ILabelValue>(i => ({ id: i.id, label: i.item, value: i.itemValue })) : [];
      }
      // todo: fetch other types
      // The options for entityList and url were removed as there's already a Autocomplete component that handles these
      case 'entityList': {
        return [];
      }
      case 'url': {
        return [];
      }
    }
    return [];
  };

  if (dataSourceType === 'referenceList') {
    return (
      <RefListDropDown
        onChange={onChange}
        listName={referenceListName}
        listNamespace={referenceListNamespace}
        disabled={disabled}
        value={value}
        bordered={!hideBorder}
        defaultValue={defaultValue}
        mode={mode}
      />
    );
  }

  const options = getOptions() || [];
  const loading = refListLoading;

  return (
    <Select
      allowClear
      onChange={onChange}
      value={options.length > 0 ? value || defaultValue : null}
      defaultValue={defaultValue}
      bordered={!hideBorder}
      disabled={disabled}
      loading={loading}
      mode={mode}
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
