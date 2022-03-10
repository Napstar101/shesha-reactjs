import React, { FC } from 'react';
import { Modal, Form, ModalProps } from 'antd';
import { useDynamicModals } from '../../providers';
import { ConfigurableForm } from '../';
import { FormMode } from '../../providers/form/models';
import { IModalProps } from '../../providers/dynamicModal/models';
import { evaluateString, useShaRouting } from '../..';

export interface IDynamicModalProps extends Omit<IModalProps, 'fetchUrl'> {
  id: string;
  title?: string;
  isVisible: boolean;

  // todo: move to a separate object
  formId: string;
  mode: FormMode;
  onSubmitted?: () => void;
}

export const DynamicModal: FC<IDynamicModalProps> = props => {
  const {
    id,
    title,
    isVisible,
    formId,
    showModalFooter,
    submitHttpVerb,
    onSuccessRedirectUrl,
    initialValues,
    destroyOnClose,
  } = props;
  const [form] = Form.useForm();
  const { hide, removeModal } = useDynamicModals();
  const { router } = useShaRouting();

  const onOk = () => {
    if (showModalFooter) {
      form?.submit();
    } else {
      hideForm();
    }
  };

  const onSubmitted = (_: any, response: any) => {
    form.resetFields();

    if (onSuccessRedirectUrl) {
      const computedRedirectUrl = evaluateString(onSuccessRedirectUrl, response);

      router?.push(computedRedirectUrl);
    }

    hideForm();
    if (props.onSubmitted) props.onSubmitted();
  };

  const onCancel = () => {
    hideForm();
  };

  const hideForm = () => {
    hide(id);

    if (destroyOnClose) {
      removeModal(id);
    }
  };

  const footerProps: ModalProps = showModalFooter ? {} : { footer: null };

  return (
    <Modal
      key={id}
      title={title}
      visible={isVisible}
      onOk={onOk} // not used
      onCancel={hideForm} // not used
      {...footerProps}
      destroyOnClose
    >
      <ConfigurableForm
        id={formId}
        form={form}
        mode="edit"
        actions={{
          close: onCancel,
        }}
        onFinish={onSubmitted}
        httpVerb={submitHttpVerb}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default DynamicModal;
