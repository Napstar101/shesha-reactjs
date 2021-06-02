import { FC } from 'react';
import { EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useAppConfigurator } from '../../providers';
import SwitchToEditModeConfirmation from './switchToEditModeConfirmation';
import SwitchToLiveModeConfirmation from './switchToLiveModeConfirmation';
import React from 'react';

export interface IProps {}

export const EditModeToggler: FC<IProps> = () => {
  const { mode, toggleCloseEditModeConfirmation, toggleEditModeConfirmation } = useAppConfigurator();

  if (mode === 'edit') {
    return (
      <>
        <CheckCircleOutlined title="Click to close Edit Mode" onClick={() => toggleCloseEditModeConfirmation(true)} />
        <SwitchToLiveModeConfirmation></SwitchToLiveModeConfirmation>
      </>
    );
  } else {
    return (
      <>
        <EditOutlined title="Click to launch Edit Mode" onClick={() => toggleEditModeConfirmation(true)} />
        <SwitchToEditModeConfirmation></SwitchToEditModeConfirmation>
      </>
    );
  }
};

export default EditModeToggler;
