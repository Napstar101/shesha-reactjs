import React, { FC } from 'react';
import { Button } from 'antd';
import { useShaRouting, useDataTableStore, useForm, useModal } from '../../../../../../providers';
import { ISelectionProps } from '../../../../../../providers/dataTableSelection/models';
import { IModalProps } from '../../../../../../providers/dynamicModal/models';
import { evaluateString } from '../../../../../../providers/form/utils';
import { IToolbarButton } from '../../../../../../providers/toolbarConfigurator/models';
import ShaIcon, { IconType } from '../../../../../shaIcon';
import classNames from 'classnames';

export interface IToolbarButtonProps extends IToolbarButton {
  formComponentId: string;
  selectedRow: ISelectionProps;
}

export const ToolbarButton: FC<IToolbarButtonProps> = props => {
  const { getAction, form, setFormMode } = useForm();
  const { router } = useShaRouting();

  if (props?.buttonAction === 'dialogue') {
    const convertedProps = props as IToolbarButtonTableDialogProps;

    const modalProps: IModalProps = {
      id: props.id, // link modal to the current form component by id
      isVisible: false,
      formId: props.modalFormId,
      title: props.modalTitle,
      showModalFooter: convertedProps?.showModalFooter,
      submitHttpVerb: convertedProps?.submitHttpVerb,
      onSuccessRedirectUrl: convertedProps?.onSuccessRedirectUrl,
    };

    return props?.refreshTableOnSuccess ? (
      <ToolbarButtonTableDialog {...props} modalProps={modalProps} />
    ) : (
      <ToolbarButtonPlainDialog {...props} modalProps={modalProps} />
    );
  }

  const onButtonClick = () => {
    switch (props.buttonAction) {
      case 'navigate':
        if (props.targetUrl) {
          const preparedUrl =
            props.targetUrl.indexOf('{{') > -1
              ? evaluateString(props.targetUrl, { selectedRow: props.selectedRow })
              : props.targetUrl;

          router?.push(preparedUrl);
        } else console.warn('tagret Url is not specified');
        break;
      // case 'dialogue':
      //   if (props.modalFormId) {
      //     dynamicModal.open();
      //   } else console.warn('Modal Form is not specified');
      //   break;
      case 'submit':
        form?.submit();
        break;
      case 'startFormEdit':
        setFormMode('edit');
        break;
      case 'cancelFormEdit':
        setFormMode('readonly');
        break;
      case 'reset':
        form?.resetFields();
        break;
      case 'executeFormAction':
        if (props.formAction) {
          const actionBody = getAction(props.formComponentId, props.formAction);
          if (actionBody) actionBody();
          else console.warn(`action ${props.formAction} not found on the form`);
        } else console.warn('formAction is not specified');
        break;

      default:
        break;
    }
  };

  return (
    <Button
      title={props.tooltip}
      onClick={onButtonClick}
      type={props.buttonType}
      danger={props.danger}
      icon={props.icon ? <ShaIcon iconName={props.icon as IconType} /> : undefined}
      className={classNames('sha-toolbar-btn sha-toolbar-btn-configurable')}
    >
      {props.name}
    </Button>
  );
};

interface IToolbarButtonTableDialogProps extends Omit<IModalProps, 'formId' | 'isVisible'>, IToolbarButtonProps {
  modalProps?: IModalProps;
}

/**
 * This button should be rendered on the toolbar within a DataTableContext as it references the table store
 * @param props
 * @returns
 */
const ToolbarButtonTableDialog: FC<IToolbarButtonTableDialogProps> = props => {
  const { refreshTable } = useDataTableStore();

  const modalProps: IModalProps = {
    ...props?.modalProps,
    onSubmitted: () => {
      // todo: implement custom actions support
      refreshTable();
    },
  };

  const dynamicModal = useModal(modalProps);

  const onButtonClick = () => {
    if (props.modalFormId) {
      dynamicModal.open();
    } else console.warn('Modal Form is not specified');
  };

  return (
    <Button
      title={props.tooltip}
      onClick={onButtonClick}
      type={props.buttonType}
      danger={props.danger}
      icon={props.icon ? <ShaIcon iconName={props.icon as IconType} /> : undefined}
      className={classNames('sha-toolbar-btn sha-toolbar-btn-configurable')}
    >
      {props.name}
    </Button>
  );
};

const ToolbarButtonPlainDialog: FC<IToolbarButtonTableDialogProps> = props => {
  const dynamicModal = useModal(props?.modalProps);

  const onButtonClick = () => {
    if (props.modalFormId) {
      dynamicModal.open();
    } else console.warn('Modal Form is not specified');
  };

  return (
    <Button
      title={props.tooltip}
      onClick={onButtonClick}
      type={props.buttonType}
      danger={props.danger}
      icon={props.icon ? <ShaIcon iconName={props.icon as IconType} /> : undefined}
      className={classNames('sha-toolbar-btn sha-toolbar-btn-configurable')}
    >
      {props.name}
    </Button>
  );
};

export default ToolbarButton;
