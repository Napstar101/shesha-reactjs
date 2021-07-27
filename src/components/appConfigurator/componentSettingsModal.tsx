import React, { FC } from 'react';
import { Modal } from 'antd';
import { Form } from 'antd';
import { ConfigurableForm } from '../configurableForm/configurableForm';
import { IConfigurableFormComponent } from '../../providers/form/models';

export interface IProps<TModel = any> {
  title?: string;
  model: TModel;
  markup: IConfigurableFormComponent[];
  onCancel: () => void;
  onSave: (model: TModel) => void;
}

export const ComponentSettingsModal: FC<IProps> = ({ title, markup, model, onCancel, onSave }) => {
  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 },
  };
  const [form] = Form.useForm();

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal visible={true} title={title} onCancel={onCancel} onOk={onOk}>
      {/* <div>You can customize the Logo component from this screen or upload a new one.</div> */}
      <ConfigurableForm
        mode="edit"
        {...formLayout}
        form={form}
        onFinish={onSave}
        markup={markup}
        initialValues={model}
      ></ConfigurableForm>
    </Modal>
  );
};

export default ComponentSettingsModal;
