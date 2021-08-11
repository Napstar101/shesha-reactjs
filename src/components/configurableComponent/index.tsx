import React, { ReactNode } from 'react';
import { createConfigurableComponent } from '../../providers';
import { ConfigurableComponentRenderer } from '../configurableComponentRenderer';

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

export interface ISettingsEditorProps<TSettings = any> {
  settings: TSettings,
  onSave: (settings: TSettings) => void,
  onCancel: () => void,
};

export interface ISettingsEditor<TSettings = any> {
  render: (props: ISettingsEditorProps<TSettings>) => ReactNode,
  save?: () => Promise<TSettings>,
}

export interface IConfigurableComponentProps<TSettings = any> {
  canConfigure?: boolean;
  children: ConfigurableComponentChildrenFn<TSettings>;
  onStartEdit?: () => void;
  defaultSettings: TSettings;
  settingsEditor?: ISettingsEditor<TSettings>,
  id?: string;
}

export interface IBlockOverlayProps {
  visible: boolean;
  onClick?: () => void;
}

export const ConfigurableComponent = <TSettings extends any>({ 
  children,
  canConfigure = true,
  defaultSettings,
  settingsEditor,
  id,
}: IConfigurableComponentProps<TSettings>) => {
  const { ConfigurableComponentProvider, useConfigurableComponent } = createConfigurableComponent<TSettings>(defaultSettings);

  return (
    <ConfigurableComponentProvider
      id={id}  
    >
      <ConfigurableComponentRenderer
        canConfigure={canConfigure}
        contextAccessor={useConfigurableComponent}
        settingsEditor={settingsEditor}
      >
        {children}
      </ConfigurableComponentRenderer>
    </ConfigurableComponentProvider>
  );
};

export default ConfigurableComponent;
