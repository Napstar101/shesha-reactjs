import React, { FC } from 'react';
import { Form, Modal, Spin } from 'antd';
import { ValidationErrors, ConfigurableForm } from '../';
import { FormInstance } from 'antd/lib/form';
import { useUi } from '../../providers';
import { IDataMutator } from './models';

interface IModalProps {
  title: string;
  visible: boolean;
  formPath: string;
  updater: (props: any) => IDataMutator;
  onCancel: (form: FormInstance) => void;
  onSuccess: (form: FormInstance) => void;
  prepareValues?: (values: any) => any;
}

const ModalForm: FC<IModalProps> = ({ visible, onCancel, onSuccess, updater, title, formPath, prepareValues }) => {
  const { mutate: save, error, loading } = updater({});

  const [form] = Form.useForm();

  const handleSubmit = values => {
    const preparedValues = typeof prepareValues === 'function' ? prepareValues(values) : values;
    save(preparedValues).then(() => {
      onSuccess(form);
    });
  };

  const handleCancel = () => {
    onCancel(form);
  };

  const { formItemLayout } = useUi();

  return (
    <Modal
      width="60%"
      visible={visible}
      title={title}
      okText="Create"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error?.data}></ValidationErrors>
        <ConfigurableForm mode="edit" {...formItemLayout} form={form} onFinish={handleSubmit} path={formPath} />
      </Spin>
    </Modal>
  );
};
export default ModalForm;
