import React, { FC, ChangeEvent } from 'react';
import { Input, DatePicker, InputNumber, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment, { Moment, isMoment } from 'moment';
import { IndexColumnDataType } from '../../providers/dataTable/interfaces';
import RefListDropDown from '../refListDropDown';
import EntityDropdown from '../entityDropdown';

interface IColumnEditFieldProps {
  id: string;
  name: string;
  caption?: string;
  referenceListName?: string;
  referenceListNamespace?: string;
  entityReferenceTypeShortAlias?: string;
  dataType: IndexColumnDataType;
  value?: any;
  onChange: (key: string, value: any) => void;
}

export const ColumnEditField: FC<IColumnEditFieldProps> = ({
  // id,
  name: name,
  caption,
  dataType = 'string',
  referenceListName,
  referenceListNamespace,
  entityReferenceTypeShortAlias,
  value: stateValue,
  onChange: handleChange,
}) => {
  console.log('caption', caption);

  const handleFilter = (changeValue: number | string | undefined | ChangeEvent<HTMLInputElement>) => {
    if (changeValue) {
      const value =
        typeof changeValue === 'number' ? changeValue : (changeValue as ChangeEvent<HTMLInputElement>).target.value;
      handleChange(name, value);
    }
  };

  const renderFilterInput = (type: IndexColumnDataType = 'string') => {
    const placeholder = `Enter ${caption}`;
    if (type === 'string') {
      return <Input size="small" placeholder={placeholder} />;
    }

    return (
      <InputNumber
        className="ant-input-number-no-margin"
        size="small"
        onChange={handleFilter}
        placeholder={placeholder}
        type="number"
        min={0}
        // value={stateValue as number}
      />
    );
  };

  const dateFormat = 'DD/MM/YYYY';

  // @ts-ignoreß
  const getMoment = (value: any): Moment => {
    if (stateValue === null || stateValue === undefined) return undefined;

    if (isMoment(value)) return value;
    window.moment = moment;

    const date = moment(new Date(value), dateFormat);

    return date.isValid() ? date : undefined;
  };

  const renderDateInput = () => {
    const onChange = (_dateEvent: any, dateString: string | string[]) => {
      handleChange(name, dateString);
    };

    return <DatePicker size="small" onChange={onChange} format={dateFormat} />;
  };

  const renderBooleanInput = () => {
    const onChange = (e: CheckboxChangeEvent) => {
      handleChange(name, e.target.checked);
    };
    return <Checkbox onChange={onChange}>Yes</Checkbox>;
  };

  const renderRenderReflistDropdown = () => {
    const onChange = (value: any) => {
      handleChange(name, value);
    };

    if (onChange) {
      /// Do something
    }
    return (
      <RefListDropDown
        listName={referenceListName}
        listNamespace={referenceListNamespace}
        size="small"
        mode={dataType === 'refList' ? null : 'multiple'}
        style={{ width: '100%' }}
        // onChange={onChange}
      />
    );
  };

  const renderEntityDropdown = () => {
    return <EntityDropdown typeShortAlias={entityReferenceTypeShortAlias} />;
  };

  return (
    <div className="column-item-filter">
      {dataType === 'string' && renderFilterInput()}

      {dataType === 'number' && renderFilterInput('number')}

      {['date', 'datetime'].includes(dataType) && renderDateInput()}

      {dataType === 'boolean' && renderBooleanInput()}

      {dataType === 'entityReference' && renderEntityDropdown()}

      {['refList', 'multiValueRefList'].includes(dataType) && renderRenderReflistDropdown()}
    </div>
  );
};

export default ColumnEditField;
