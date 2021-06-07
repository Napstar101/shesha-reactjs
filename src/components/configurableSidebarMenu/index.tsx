import React, { FC } from 'react';
import { ConfigurableComponent, ISettingsEditorProps } from '../configurableComponent';
import { ErrorBoundary } from '../errorBoundary/errorBoundary';
import { SidebarMenu } from '../sidebarMenu';
import { SidebarMenuProvider, ISidebarMenuItem } from '../../providers/sidebarMenu';
import ComponentSettingsModal from './settingsModal';

export interface ISideBarMenuProps {
  items: ISidebarMenuItem[];
}

export interface IConfigurableSidebarMenuProps {
  defaultSettings: ISideBarMenuProps;
  id: string;
}

export const ConfigurableSidebarMenu: FC<IConfigurableSidebarMenuProps> = (props) => {

  const editor = (editorProps: ISettingsEditorProps<ISideBarMenuProps>) => {
    return (
      <ComponentSettingsModal
        settings={editorProps.settings}
        onSave={editorProps.onSave}
        onCancel={editorProps.onCancel}
      >
      </ComponentSettingsModal>
    );
  }

  return (
    <ErrorBoundary>
      <ConfigurableComponent<ISideBarMenuProps>
        defaultSettings={props.defaultSettings}
        settingsEditor={{
          render: editor
        }}
        id={props.id}
      >
        {(componentState, BlockOverlay) => (
          <div className={`sidebar ${componentState.wrapperClassName}`}>
            <BlockOverlay></BlockOverlay>
            <SidebarMenuProvider items={componentState.settings?.items || []}>
              <SidebarMenu>
              </SidebarMenu>
            </SidebarMenuProvider>
          </div>
        )}
      </ConfigurableComponent>
    </ErrorBoundary>
  );
};

export default ConfigurableSidebarMenu;