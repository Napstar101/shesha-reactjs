import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Show } from '../show';
import { BasicDisplayFormItem } from '../basicDisplayFormItem';
import { useForm } from '../../providers';

export interface IReadOnlyDisplayFormItemProps {
  value?: string;
}

export const ReadOnlyDisplayFormItem: FC<IReadOnlyDisplayFormItemProps> = ({ value }) => {
  const { formSettings, setFormMode } = useForm();

  const setFormModeToEdit = () => setFormMode('edit');

  return (
    <BasicDisplayFormItem className="read-only-display-form-item">
      {value}
      <Show when={formSettings?.enableModeToggler}>
        <EditOutlined className="red-only-mode-toggler" onClick={setFormModeToEdit} />
      </Show>
    </BasicDisplayFormItem>
  );
};

export default ReadOnlyDisplayFormItem;
