import React, { FC } from 'react';
import { Modal } from 'antd';
import { useAppConfigurator } from '../../providers';

export interface IProps {}

export const SwitchToEditModeConfirmation: FC<IProps> = () => {
  const { editModeConfirmationVisible, switchApplicationMode, toggleEditModeConfirmation } = useAppConfigurator();
  return (
    <Modal
      visible={editModeConfirmationVisible}
      onCancel={() => toggleEditModeConfirmation(false)}
      onOk={() => switchApplicationMode('edit')}
      okButtonProps={{}}
    >
      <div>
        <h2>Launch Edit Mode?</h2>
      </div>
    </Modal>
  );
};

export default SwitchToEditModeConfirmation;
