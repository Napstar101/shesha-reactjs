import React, { FC, ChangeEvent } from 'react';
import { Input, DatePicker, InputNumber, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment, { Moment, isMoment } from 'moment';
import { IndexColumnDataType } from '../../providers/dataTable/interfaces';
import RefListDropDown, { IRefListDropDownOption } from '../refListDropDown';
import EntityDropdown from '../entityDropdown';
import { IColumnEditFieldProps } from './interfaces';
import { IGuidNullableEntityWithDisplayNameDto, IReferenceListItemDto, IReferenceListItemValueDto } from '../../interfaces/shesha';
import FormItem from 'antd/lib/form/FormItem';

// (alias) type IndexColumnDataType = "string" | "number" | "boolean" | "date" | "datetime" | "time" | "refList" | "multiValueRefList" | "entityReference" | "other"

export const ColumnEditField: FC<IColumnEditFieldProps> = props => {
  const {
    // id,
    name: name,
    caption,
    dataType = 'string',
    referenceListName,
    referenceListNamespace,
    entityReferenceTypeShortAlias,
    value: stateValue,
    onChange: handleChange,
  } = props;
  // console.log('ColumnEditField stateValue', stateValue);

  const placeholder = [
    'entityReference',
    'date',
    'datetime',
    'refList',
    'multiValueRefList',
    'entityReference',
  ].includes(dataType)
    ? `Select ${caption}`
    : `Enter ${caption}`;

  const handleInputChange = (changeValue: number | string | undefined | ChangeEvent<HTMLInputElement>) => {
    // console.log('handleInputChange changeValue: ', changeValue);
    if (changeValue) {
      const value =
        typeof changeValue === 'number' ? changeValue : (changeValue as ChangeEvent<HTMLInputElement>).target.value;
      handleChange(name, value);
    }
  };

  const renderFilterInput = (type: IndexColumnDataType = 'string') => {
    if (type === 'string') {
      return <Input size="small" placeholder={placeholder} value={stateValue} onChange={handleInputChange} />;
    }

    return (
      <InputNumber
        className="ant-input-number-no-margin"
        size="small"
        onChange={handleInputChange}
        placeholder={placeholder}
        type="number"
        min={0}
        value={(stateValue || 0) as number}
      />
    );
  };

  const dateFormat = 'DD/MM/YYYY';

  // @ts-ignore
  const getMoment = (value: any): Moment => {
    if (stateValue === null || stateValue === undefined) return undefined;

    if (isMoment(value)) return value;

    const date = moment(new Date(value), dateFormat);

    return date.isValid() ? date : undefined;
  };

  const renderDateInput = () => {
    const onChange = (_dateEvent: any, dateString: string | string[]) => {
      handleChange(name, dateString);
    };

    const placeholder = `Select ${caption}`;

    return (
      <DatePicker
        size="small"
        onChange={onChange}
        value={getMoment(stateValue)}
        format={dateFormat}
        placeholder={placeholder}
      />
    );
  };

  const renderBooleanInput = () => {
    const onChange = (e: CheckboxChangeEvent) => {
      handleChange(name, e.target.checked);
    };
    return <Checkbox onChange={onChange}>Yes</Checkbox>;
  };

  // {['refList', 'multiValueRefList'].includes(dataType) && renderRenderReflistDropdown()}
  const renderRenderReflistDropdown = () => {
    const placeholder = `Select ${caption}`;

    const onChange = (_: number | number[], option: any) => {
      const val =
        dataType === 'multiValueRefList'
          ? (option as IRefListDropDownOption[])?.map<IReferenceListItemDto>(({ children, value }) => ({
              itemValue: value as number,
              item: children,
            }))
          : {
              itemValue: (option as IRefListDropDownOption)?.value as number,
              item: (option as IRefListDropDownOption)?.children,
            };

      handleChange(name, val);
    };

    const getMultiValueRefListValues = () => 
      (stateValue as [])
      ?.map(item => typeof item === 'object' ? (item as IReferenceListItemValueDto)?.itemValue : item )
      ?.filter(Boolean)
    
    const getReferenceListItemValue = () => (typeof stateValue === 'string' ? stateValue : (stateValue as IReferenceListItemValueDto)?.itemValue)

    const val =
      dataType === 'multiValueRefList'
        ? getMultiValueRefListValues()
        : getReferenceListItemValue();

    return (
      <RefListDropDown
        listName={referenceListName}
        listNamespace={referenceListNamespace}
        size="small"
        mode={dataType === 'refList' ? null : 'multiple'}
        placeholder={placeholder}
        style={{ width: '100%' }}
        onChange={onChange}
        value={val}
      />
    );
  };

  // dataType === 'entityReference' && renderEntityDropdown()
  const renderEntityDropdown = () => {
    const value = typeof stateValue === 'object' ? (stateValue as IGuidNullableEntityWithDisplayNameDto)?.displayText : stateValue;

    const onChange = (_: number | number[], option: any) => {
      const { children, value } = option as IRefListDropDownOption;

      handleChange(name, { value, displayText: children });
    };

    return (
      <EntityDropdown
        typeShortAlias={entityReferenceTypeShortAlias}
        value={value}
        onChange={onChange}
        size="small"
        placeholder={placeholder}
        style={{ width: '100%' }}
      />
    );
  };

  return (
    <div className="column-item-filter">
      <FormItem>
        {dataType === 'string' && renderFilterInput()}

        {dataType === 'number' && renderFilterInput('number')}

        {['date', 'datetime'].includes(dataType) && renderDateInput()}

        {dataType === 'boolean' && renderBooleanInput()}

        {dataType === 'entityReference' && renderEntityDropdown()}

        {['refList', 'multiValueRefList'].includes(dataType) && renderRenderReflistDropdown()}
      </FormItem>
    </div>
  );
};

export default ColumnEditField;
