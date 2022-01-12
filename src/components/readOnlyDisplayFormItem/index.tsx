import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { Show } from '../show';
import { BasicDisplayFormItem } from '../basicDisplayFormItem';
import { useForm } from '../../providers';

export interface IReadOnlyDisplayFormItemProps extends FormItemProps {
  notProvidedText?: string;
}

export const ReadOnlyDisplayFormItem: FC<IReadOnlyDisplayFormItemProps> = ({ children, ...rest }) => {
  const { formSettings, setFormMode } = useForm();

  const setFormModeToEdit = () => setFormMode('edit');

  return (
    <BasicDisplayFormItem className="read-only-display-form-item" {...rest}>
      {children}
      <Show when={formSettings?.enableModeToggler}>
        <EditOutlined className="red-only-mode-toggler" onClick={setFormModeToEdit} />
      </Show>
    </BasicDisplayFormItem>
  );
};

export default ReadOnlyDisplayFormItem;
