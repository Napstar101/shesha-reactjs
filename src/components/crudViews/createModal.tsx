import React, { FC, ReactNode } from 'react';
import { Button, Form, Modal, Spin } from 'antd';
import { ValidationErrors, ConfigurableForm } from '../';
import { FormInstance } from 'antd/lib/form';
import { useUi } from '../../providers';
import { IDataMutator } from './models';
import { useState } from 'react';
import { IFormActions, IFormSections } from '../../providers/form/models';

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

  /**
   * A boolean value that allows multiple records to be save on form
   */
  keepModalOpenAfterSave?: boolean;

  /**
   * Allows changing of caption of the Save/Submit in the modal
   */
  saveCaption?: string | ReactNode;

  onFieldsChange?: (changedFields: any[], allFields: any[]) => void;

  beforeSubmit?: (form: any) => boolean;

  actions?: IFormActions;

  sections?: IFormSections;

  destroyOnClose?: boolean;
}

const ModalForm: FC<IModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  updater,
  title,
  formPath,
  prepareValues,
  keepModalOpenAfterSave,
  saveCaption = 'Save',
  onFieldsChange,
  beforeSubmit,
  actions,
  sections,
  destroyOnClose = true,
}) => {
  const { mutate: save, error, loading } = updater({});

  const [localKeepOpen, setLocalKeepOpen] = useState(false);

  const [form] = Form.useForm();

  const onSubmit = () => {
    setLocalKeepOpen(false);

    form.submit();
  };

  const onSubmitKeepOpen = () => {
    setLocalKeepOpen(true);

    form.submit();
  };

  const onFinish = (values: any) => {
    // We must always use updated values, in case the user had prepared values by then also update the values in the form
    const preparedValues = typeof prepareValues === 'function' ? { ...prepareValues(values), ...values } : values;

    if (beforeSubmit && !beforeSubmit(preparedValues)) {
      return;
    }

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
      destroyOnClose={destroyOnClose}
      footer={
        <div>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={onSubmit}>
            {saveCaption}
          </Button>
          {keepModalOpenAfterSave && (
            <Button type="primary" onClick={onSubmitKeepOpen}>
              Save And Capture Another
            </Button>
          )}
        </div>
      }
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error?.data}></ValidationErrors>

        <ConfigurableForm
          mode="edit"
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          path={formPath}
          onFieldsChange={onFieldsChange}
          actions={actions}
          sections={sections}
        />
      </Spin>
    </Modal>
  );
};
export default ModalForm;
