import React, { FC, ReactNode } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Show } from '../show';
import { BasicDisplayFormItem } from '../basicDisplayFormItem';
import { useForm } from '../../providers';
import moment from 'moment';
import { IDtoType, ISelectOption } from '../autocomplete';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Switch, Tag } from 'antd';

type AutocompleteType = ISelectOption<IDtoType>;

export interface IReadOnlyDisplayFormItemProps {
  value?: any;
  render?: () => ReactNode | ReactNode;
  type?: 'string' | 'number' | 'dropdown' | 'dropdownMultiple' | 'time' | 'datetime' | 'checkbox' | 'switch';
  dropdownDisplayMode?: 'raw' | 'tags';
  dateFormat?: string;
  timeFormat?: string;
  disabled?: boolean;
}

export const ReadOnlyDisplayFormItem: FC<IReadOnlyDisplayFormItemProps> = ({
  value,
  type = 'string',
  dateFormat = 'DD-MM-YYYY',
  timeFormat = 'hh:mm',
  dropdownDisplayMode = 'raw',
  render,
  disabled,
}) => {
  const { formSettings, setFormMode } = useForm();

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

        throw new Error(`Invalid data type passed. Expected string but found: ${typeof value}`);
      }
      case 'checkbox': {
        return <Checkbox checked={Boolean(value)} disabled />;
      }
      case 'switch': {
        return <Switch checked={Boolean(value)} disabled />;
      }

      default:
        break;
    }

    return value;
  };

  return (
    <BasicDisplayFormItem className="read-only-display-form-item">
      {renderValue()}

      <Show when={formSettings?.showModeToggler && !disabled}>
        <EditOutlined className="red-only-mode-toggler" onClick={setFormModeToEdit} />
      </Show>
    </BasicDisplayFormItem>
  );
};

export default ReadOnlyDisplayFormItem;
