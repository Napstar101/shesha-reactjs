import { FC } from 'react';
import { Modal } from 'antd';
import { ColumnsConfiguratorProvider, useColumnsConfigurator } from '../../../../../../providers/datatableColumnsConfigurator';
import { ColumnsConfigurator } from './columnsConfigurator';
import { IConfigurableColumnsBase } from '../../../../../../providers/datatableColumnsConfigurator/models';
import React from 'react';

export interface IColumnsEditorModal {
  visible: boolean;
  hideModal: () => void;
  value?: object;
  onChange?: any;
}

export const ColumnsEditorModalInner: FC<IColumnsEditorModal> = ({ visible, onChange, hideModal }) => {
  const { items } = useColumnsConfigurator();

  const onOkClick = () => {
    debugger
    if (typeof onChange === 'function') onChange(items);
    hideModal();
  };

  return (
    <Modal width="60%" visible={visible} title="Configure Columns" okText="Save" onCancel={hideModal} onOk={onOkClick}>
      <ColumnsConfigurator></ColumnsConfigurator>
    </Modal>
  );
};

export const ColumnsEditorModal: FC<IColumnsEditorModal> = props => {
  return (
    <ColumnsConfiguratorProvider items={(props.value as IConfigurableColumnsBase[]) || []}>
      <ColumnsEditorModalInner {...props}></ColumnsEditorModalInner>
    </ColumnsConfiguratorProvider>
  );
};

export default IColumnsEditorModal;
