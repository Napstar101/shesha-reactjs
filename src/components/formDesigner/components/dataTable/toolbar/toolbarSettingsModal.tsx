import React, { FC } from 'react';
import { Modal } from 'antd';
import { ToolbarConfiguratorProvider, useToolbarConfigurator } from '../../../../../providers/toolbarConfigurator';
import { ToolbarConfigurator } from './toolbarConfigurator';
import { ToolbarItemProps } from '../../../../../providers/toolbarConfigurator/models';

export interface IToolbarSettingsModal {
  visible: boolean;
  hideModal: () => void;
  value?: object;
  onChange?: any;
  allowAddGroups?: boolean;
}

export const ToolbarSettingsModalInner: FC<IToolbarSettingsModal> = ({
  visible,
  onChange,
  hideModal,
  allowAddGroups,
}) => {
  const { items } = useToolbarConfigurator();

  const onOkClick = () => {
    if (typeof onChange === 'function') onChange(items);
    hideModal();
  };

  return (
    <Modal width="60%" visible={visible} title="Configure Toolbar" okText="Save" onCancel={hideModal} onOk={onOkClick}>
      <ToolbarConfigurator allowAddGroups={allowAddGroups} />
    </Modal>
  );
};

export const ToolbarSettingsModal: FC<IToolbarSettingsModal> = props => {
  return (
    <ToolbarConfiguratorProvider items={(props.value as ToolbarItemProps[]) || []}>
      <ToolbarSettingsModalInner {...props} />
    </ToolbarConfiguratorProvider>
  );
};

export default IToolbarSettingsModal;
