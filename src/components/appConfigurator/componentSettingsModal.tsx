import React from 'react';
import { Form, Modal } from 'antd';
import { ConfigurableForm } from '../configurableForm';
import { IConfigurableFormComponent } from '../../providers/form/models';

export interface IProps<TModel = any> {
  title?: string;
  model: TModel;
  markup: IConfigurableFormComponent[];
  onCancel: () => void;
  onSave: (model: TModel) => void;
}

export const ComponentSettingsModal = <TSettings extends any>({
  title,
  markup,
  model,
  onCancel,
  onSave,
}: IProps<TSettings>) => {
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
      />
    </Modal>
  );
};

export default ComponentSettingsModal;
