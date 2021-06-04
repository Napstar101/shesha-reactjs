import React, { FC, useState } from 'react';
import { useAppConfigurator, useConfigurableComponent } from '../../providers';
import { ComponentSettingsModal } from './componentSettingsModal';

export interface IComponentStateProps<TSettings = any> {
  isSelected: boolean;
  isEditMode: boolean;
  wrapperClassName: string;
  settings: TSettings;
}

export interface IOverlayProps {
  children?: React.ReactElement;
}

export type ConfigurableComponentChildrenFn<TSettings = any> = (
  componentState: IComponentStateProps<TSettings>,
  BlockOverlay: (props: IOverlayProps) => React.ReactElement
) => React.ReactNode | null;

export interface IConfigurableComponentProps<TSettings = any> {
  canConfigure?: boolean;
  children: ConfigurableComponentChildrenFn<TSettings>;
  onStartEdit?: () => void;
  defaultSettings?: TSettings;
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

export const ConfigurableComponent = <TSettings extends any>({ 
  children,
  canConfigure = true,
  onStartEdit,
  defaultSettings,
}: IConfigurableComponentProps<TSettings>) => {

  const [modalVisible, setModalVisible] = useState(false);
  const { mode } = useAppConfigurator();
  const { settings, save } = useConfigurableComponent();

  if (!children) return null;

  if (!canConfigure){
    return (
      <>
        {children({ isEditMode: false, isSelected: false, wrapperClassName: '', settings: defaultSettings }, () => (
          <></>
        ))}
      </>
    );
  }
  
  const componentState: IComponentStateProps = {
    isEditMode: mode === 'edit',
    isSelected: false,
    wrapperClassName: 'sha-configurable-component',
    settings: defaultSettings,
  };

  const onOverlayClick = () => {
    if (onStartEdit) onStartEdit();
    else setModalVisible(true);
  };

  const onCancelClick = () => {
    setModalVisible(false);
  };

  const onSave = (model: TSettings) => {
    save(JSON.stringify(model));
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
        <ComponentSettingsModal<TSettings>
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
