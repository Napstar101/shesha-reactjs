import React, { FC, ReactNode } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Show } from '../show';
import { useForm } from '../../providers';
import { IDtoType, ISelectOption } from '../autocomplete';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Switch, Tag } from 'antd';
import { getMoment } from '../../utils/date';
import moment from 'moment';

type AutocompleteType = ISelectOption<IDtoType>;

export interface IReadOnlyDisplayFormItemProps {
  value?: any;
  render?: () => ReactNode | ReactNode;
  type?:
    | 'string'
    | 'number'
    | 'dropdown'
    | 'dropdownMultiple'
    | 'time'
    | 'datetime'
    | 'checkbox'
    | 'switch'
    | 'radiogroup';
  dropdownDisplayMode?: 'raw' | 'tags';
  dateFormat?: string;
  timeFormat?: string;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
}

export const ReadOnlyDisplayFormItem: FC<IReadOnlyDisplayFormItemProps> = ({
  value,
  type = 'string',
  dateFormat = 'DD-MM-YYYY',
  timeFormat = 'hh:mm',
  dropdownDisplayMode = 'raw',
  render,
  disabled,
  checked,
  defaultChecked,
}) => {
  if (type === 'switch') {
    console.log('ReadOnlyDisplayFormItem type, checkbox, defaultChecked: ', type, checked, defaultChecked);
  }

  const { formSettings, setFormMode, formMode } = useForm();

  const setFormModeToEdit = () => setFormMode('edit');

  const renderValue = () => {
    if (render) {
      return typeof render === 'function' ? render() : render;
    }

    if (typeof value === 'undefined' && (type === 'dropdown' || type === 'dropdownMultiple')) {
      return '';
    }

    switch (type) {
      case 'dropdown':
        if (!Array.isArray(value)) {
          return (value as AutocompleteType)?.label;
        }

        throw new Error(
          `Invalid data type passed. Expected IGuidNullableEntityWithDisplayNameDto but found ${typeof value}`
        );

      case 'dropdownMultiple': {
        if (Array.isArray(value)) {
          const values = (value as AutocompleteType[])?.map(({ label }) => label);

          return dropdownDisplayMode === 'raw' ? values?.join(', ') : values?.map(value => <Tag>{value}</Tag>);
        }

        throw new Error(
          `Invalid data type passed. Expected IGuidNullableEntityWithDisplayNameDto[] but found ${typeof value}`
        );
      }
      case 'time':
      case 'datetime': {
        if (typeof value === 'string') {
          return moment(value).format(type === 'datetime' ? dateFormat : timeFormat);
        }

        return getMoment(value, type === 'datetime' ? dateFormat : timeFormat)?.toISOString() || '';

        // throw new Error(`Invalid data type passed. Expected string but found: ${typeof value}`);
      }
      case 'checkbox': {
        return <Checkbox checked={checked} defaultChecked={defaultChecked} disabled />;
      }
      case 'switch': {
        return <Switch checked={checked} defaultChecked={defaultChecked} disabled />;
      }

      default:
        break;
    }

    return value;
  };

  return (
    <span className="read-only-display-form-item">
      {renderValue()}

      <Show when={formSettings?.showModeToggler && !disabled && formMode === 'readonly'}>
        <EditOutlined className="red-only-mode-toggler" onClick={setFormModeToEdit} />
      </Show>
    </span>
  );
};

export default ReadOnlyDisplayFormItem;
