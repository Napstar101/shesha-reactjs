import React, { FC, ReactNode, useState } from 'react';
import { Button, Form, Modal, Spin } from 'antd';
import { ValidationErrors, ConfigurableForm } from '../';
import { FormInstance } from 'antd/lib/form';
import { useShaRouting, useUi } from '../../providers';
import { IDataMutator } from './models';
import { FormMarkup, IFormActions, IFormSections } from '../../providers/form/models';

export enum OnSuccessActionType {
  Return = 'RETURN',
  AddMore = 'ADD_MORE',
  GoToDetails = 'GO_TO_DETAILS',
  GoToUrl = 'GO_TO_URL',
}

export interface IGenericCreateModalProps {
  /**
   * Modal title
   */
  title: string;

  /**
   * Whether the modal is visible
   */
  visible?: boolean;

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
  onCancel?: (form: FormInstance) => void;

  /**
   * A callback to for when the updating of an entity is successful
   */
  onSuccess?: (form: FormInstance, keepOpen?: boolean) => void;

  /**
   * A function to prepare modal values
   */
  prepareValues?: (values: any) => any;

  /**
   * An enum that determines what happens after a user saves a form
   */
  OnSuccessAction?: OnSuccessActionType;

  /**
   * Allows changing of the label of the Save/Submit in the modal
   */
  submitButtonLabel?: string | ReactNode;

  /**
   * Allows changing of the label of the Cancel in the modal
   */
  cancelButtonLabel?: string | ReactNode;

  onFieldsChange?: (changedFields: any[], allFields: any[]) => void;

  beforeSubmit?: (form: any) => boolean;

  actions?: IFormActions;

  sections?: IFormSections;

  destroyOnClose?: boolean;

  formMarkup?: FormMarkup;

  returnUrlOnSuccess?: string | ((data: any) => string);
}

const GenericCreateModal: FC<IGenericCreateModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  updater,
  title,
  formPath,
  prepareValues,
  OnSuccessAction = OnSuccessActionType.Return,
  submitButtonLabel = 'Submit',
  cancelButtonLabel = 'Cancel',
  onFieldsChange,
  beforeSubmit,
  actions,
  sections,
  destroyOnClose = true,
  formMarkup,
  returnUrlOnSuccess,
}) => {
  const { mutate: save, error, loading } = updater({});
  const { router } = useShaRouting();

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

    save(preparedValues).then(response => {
      onSuccess(form, localKeepOpen);

      if (returnUrlOnSuccess) {
        router?.push(typeof returnUrlOnSuccess === 'string' ? returnUrlOnSuccess : returnUrlOnSuccess(response));
      }
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
          <Button onClick={handleCancel}>{cancelButtonLabel}</Button>
          <Button type="primary" onClick={onSubmit}>
            {submitButtonLabel}
          </Button>
          {OnSuccessAction == OnSuccessActionType.AddMore && (
            <Button type="primary" onClick={onSubmitKeepOpen}>
              Save And Capture Another
            </Button>
          )}
        </div>
      }
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error?.data} />

        <ConfigurableForm
          mode="edit"
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          path={formPath}
          markup={formMarkup}
          onFieldsChange={onFieldsChange}
          actions={actions}
          sections={sections}
        />
      </Spin>
    </Modal>
  );
};
export default GenericCreateModal;
