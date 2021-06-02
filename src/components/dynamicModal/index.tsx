import React, { FC } from 'react';
import { Modal, Form } from 'antd';
import { useDynamicModals } from '../../providers';
import { ConfigurableForm } from '../';
import { FormMode } from '../../providers/form/models';

export interface IDynamicModalProps {
  id: string;
  title?: string;
  isVisible: boolean;

  // todo: move to a separate object
  formId: string;
  mode: FormMode;
  onSubmitted?: () => void;
}

export const DynamicModal: FC<IDynamicModalProps> = props => {
  const { id, title, isVisible, formId } = props;
  const [form] = Form.useForm();
  const { hide } = useDynamicModals();

  const onSubmitted = () => {
    form.resetFields();
    hide(id);
    if (props.onSubmitted) props.onSubmitted();
  };

  const onCancel = () => {
    hide(id);
  };

  return (
    <Modal
      key={id}
      title={title}
      visible={isVisible}
      onOk={() => hide(id)} // not used
      onCancel={() => hide(id)} // not used
      footer={null}
    >
      <div>
        <ConfigurableForm
          id={formId}
          form={form}
          mode="edit"
          actions={{
            close: onCancel,
          }}
          onFinish={onSubmitted}
        />
      </div>
    </Modal>
  );
};

export default DynamicModal;
