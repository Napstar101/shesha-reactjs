import React, { FC } from 'react';
import { Modal } from 'antd';
import { useAppConfigurator } from '../../providers';

export interface IProps {}

export const SwitchToLiveModeConfirmation: FC<IProps> = () => {
  const {
    closeEditModeConfirmationVisible,
    switchApplicationMode,
    toggleCloseEditModeConfirmation,
  } = useAppConfigurator();
  return (
    <Modal
      //title=""
      visible={closeEditModeConfirmationVisible}
      onOk={() => switchApplicationMode('live')}
      onCancel={() => toggleCloseEditModeConfirmation(false)}
    >
      <div>
        <h2>Close Edit Mode?</h2>
      </div>
    </Modal>
  );
};

export default SwitchToLiveModeConfirmation;
