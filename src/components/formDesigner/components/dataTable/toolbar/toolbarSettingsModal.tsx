import { FC } from 'react';
import { Modal } from 'antd';
import { ToolbarConfiguratorProvider, useToolbarConfigurator } from '../../../../../providers/toolbarConfigurator';
import { ToolbarConfigurator } from './toolbarConfigurator';
import { ToolbarItemProps } from '../../../../../providers/toolbarConfigurator/models';
import React from 'react';

export interface IToolbarSettingsModal {
  visible: boolean;
  hideModal: () => void;
  value?: object;
  onChange?: any;
}

export const ToolbarSettingsModalInner: FC<IToolbarSettingsModal> = ({ visible, onChange, hideModal }) => {
  const { items } = useToolbarConfigurator();

  const onOkClick = () => {
    if (typeof onChange === 'function') onChange(items);
    hideModal();
  };

  return (
    <Modal width="60%" visible={visible} title="Configure Toolbar" okText="Save" onCancel={hideModal} onOk={onOkClick}>
      <ToolbarConfigurator></ToolbarConfigurator>
    </Modal>
  );
};

export const ToolbarSettingsModal: FC<IToolbarSettingsModal> = props => {
  return (
    <ToolbarConfiguratorProvider items={(props.value as ToolbarItemProps[]) || []}>
      <ToolbarSettingsModalInner {...props}></ToolbarSettingsModalInner>
    </ToolbarConfiguratorProvider>
  );
};

export default IToolbarSettingsModal;
