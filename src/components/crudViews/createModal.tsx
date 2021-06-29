import React, { FC } from 'react';
import { Button, Form, Modal, Spin } from 'antd';
import { ValidationErrors, ConfigurableForm } from '../';
import { FormInstance } from 'antd/lib/form';
import { useUi } from '../../providers';
import { IDataMutator } from './models';
import { useState } from 'react';

interface IModalProps {
  /**
   * Modal title
   */
  title: string;

  /**
   * Whether the modal is visible
   */
  visible: boolean;

  /**
   * Path to the form to display on the modal
   */
  formPath: string;

  /**
   * A callback to update the entity
   */
  updater: (props: any) => IDataMutator;

  /**
   * A callback to cancel the modal
   */
  onCancel: (form: FormInstance) => void;

  /**
   * A callback to for when the updating of an entity is successful
   */
  onSuccess: (form: FormInstance, keepOpen?: boolean) => void;

  /**
   * A function to prepare modal values
   */
  prepareValues?: (values: any) => any;

  keepModalOpenAfterSave?: boolean;
}

const ModalForm: FC<IModalProps> = ({
    visible, 
    onCancel, 
    onSuccess, 
    updater, 
    title, 
    formPath, 
    prepareValues,
    keepModalOpenAfterSave
  }) => {
  const { mutate: save, error, loading } = updater({});
  const [localKeepOpen, setLocalKeepOpen] = useState(false)

  const [form] = Form.useForm();

  const onSubmit = () => {
    setLocalKeepOpen(false);

    form.submit();
  }
  
  const onSubmitKeepOpen = () => {
    setLocalKeepOpen(true);

    form.submit();
  }

  const onFinish = (values: any) => {
    const preparedValues = typeof prepareValues === 'function' ? prepareValues(values) : values;

    save(preparedValues).then(() => {
      onSuccess(form, localKeepOpen);
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
      confirmLoading={loading}
      onCancel={handleCancel}
      footer={
        <div>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={onSubmit}>Save</Button>
          {keepModalOpenAfterSave &&
            <Button type="primary" onClick={onSubmitKeepOpen}>Save And Capture Another</Button>
          }
        </div>
      }
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error?.data}></ValidationErrors>
        <ConfigurableForm
          mode="edit" {...formItemLayout}
          form={form}
          onFinish={onFinish}
          path={formPath} />
      </Spin>
    </Modal>
  );
};
export default ModalForm;
