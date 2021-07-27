import React, { FC, useState } from 'react';
import { useAppConfigurator } from '../../providers';
import { ComponentSettingsModal } from './componentSettingsModal';

export interface IComponentStateProps {
  isSelected: boolean;
  isEditMode: boolean;
  wrapperClassName: string;
}

export interface IOverlayProps {
  children?: React.ReactElement;
}

export type ConfigurableComponentChildrenFn = (
  componentState: IComponentStateProps,
  BlockOverlay: (props: IOverlayProps) => React.ReactElement
) => React.ReactNode | null;

export interface IConfigurableComponentProps {
  canConfigure?: boolean;
  children: ConfigurableComponentChildrenFn;
  onStartEdit?: () => void;
}

export interface IBlockOverlayProps {
  visible: boolean;
  onClick?: () => void;
}

const BlockOverlay: FC<IBlockOverlayProps> = ({ onClick, children, visible }) => {
  if (!visible) return null;

  return (
    <div onClick={onClick} className="sha-configurable-component-overlay">
      {children}
    </div>
  );
};

export const ConfigurableComponent: FC<IConfigurableComponentProps> = ({
  children,
  canConfigure = true,
  onStartEdit,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { mode } = useAppConfigurator();

  if (!children) return null;

  if (!canConfigure){
    return (
      <>
        {children({ isEditMode: false, isSelected: false, wrapperClassName: '' }, () => (
          <></>
        ))}
      </>
    );
  }
  
  const componentState: IComponentStateProps = {
    isEditMode: mode === 'edit',
    isSelected: false,
    wrapperClassName: 'sha-configurable-component',
  };

  const onOverlayClick = () => {
    if (onStartEdit) onStartEdit();
    else setModalVisible(true);
  };

  const onCancelClick = () => {
    setModalVisible(false);
  };

  const onSave = () => {
    setModalVisible(false);
  };

  return (
    <>
      {children(componentState, ({ children: overlayChildren }) => (
        <BlockOverlay visible={mode === 'edit'} onClick={onOverlayClick}>
          {overlayChildren}
        </BlockOverlay>
      ))}
      {modalVisible && (
        <ComponentSettingsModal
          onCancel={onCancelClick}
          onSave={onSave}
          markup={null}
          model={null}
        ></ComponentSettingsModal>
      )}
    </>
  );
};

export default ConfigurableComponent;
