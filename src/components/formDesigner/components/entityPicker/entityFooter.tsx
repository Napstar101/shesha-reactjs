import { Button } from 'antd';
import React, { FC, Fragment } from 'react';
import { IEntityPickerComponentProps } from '.';
import { useModal } from '../../../../providers';
import { IModalProps } from '../../../../providers/dynamicModal/models';

const EntityFooter: FC<IEntityPickerComponentProps> = props => {
  const modalProps: IModalProps = {
    id: props?.id,
    isVisible: false,
    formId: props?.modalFormId,
    title: props?.modalTitle,
    showModalFooter: props?.showModalFooter,
    submitHttpVerb: props?.submitHttpVerb,
    onSuccessRedirectUrl: props?.onSuccessRedirectUrl,
  };

  const dynamicModal = useModal(modalProps);

  const onAddNew = () => {
    if (props.modalFormId) {
      dynamicModal.open();
    } else console.warn('Modal Form is not specified');
  };

  if (props.allowNewRecord) {
    return (
      <Button type="primary" onClick={onAddNew}>
        Add New
      </Button>
    );
  }

  return <Fragment />;
};

export default EntityFooter;
