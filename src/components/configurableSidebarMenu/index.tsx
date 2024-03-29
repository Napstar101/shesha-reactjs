import React, { FC, useMemo } from 'react';
import { ConfigurableComponent, ISettingsEditorProps } from '../configurableComponent';
import { ErrorBoundary } from '../errorBoundary/errorBoundary';
import { SidebarMenu } from '../sidebarMenu';
import { ISidebarMenuItem, SidebarMenuProvider } from '../../providers/sidebarMenu';
import ComponentSettingsModal from './settingsModal';
import { MenuTheme } from 'antd/lib/menu/MenuContext';

export interface ISideBarMenuProps {
  items: ISidebarMenuItem[];
}

const EmptySidebarProps: ISideBarMenuProps = {
  items: [],
}

export interface IConfigurableSidebarMenuProps {
  theme?: MenuTheme;
  defaultSettings?: ISideBarMenuProps;
  id: string;
}

export const ConfigurableSidebarMenu: FC<IConfigurableSidebarMenuProps> = props => {
  const editor = (editorProps: ISettingsEditorProps<ISideBarMenuProps>) => {
    return (
      <ComponentSettingsModal
        settings={editorProps.settings ?? EmptySidebarProps}
        onSave={editorProps.onSave}
        onCancel={editorProps.onCancel}
      />
    );
  };
  const memoizedDefaults = useMemo(() =>
    props.defaultSettings ?? { items: [] }
    , [props.defaultSettings]);

  return (
    <ErrorBoundary>
      <ConfigurableComponent<ISideBarMenuProps>
        defaultSettings={memoizedDefaults}

        settingsEditor={{
          render: editor,
        }}
        id={props.id}
      >
        {(componentState, BlockOverlay) => (
          <div className={`sidebar ${componentState.wrapperClassName}`}>
            <BlockOverlay />

            <SidebarMenuProvider items={componentState.settings?.items || []}>
              <SidebarMenu theme={props.theme} />
            </SidebarMenuProvider>
          </div>
        )}
      </ConfigurableComponent>
    </ErrorBoundary>
  );
};

export default ConfigurableSidebarMenu;
