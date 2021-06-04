import React, { FC } from 'react';
import { ConfigurableComponent } from '../appConfigurator/configurableComponent';
import { ErrorBoundary } from '../errorBoundary/errorBoundary';
import { SidebarMenu } from '../sidebarMenu';
import { ConfigurableComponentProvider } from '../../providers/configurableComponent';
import { SidebarMenuProvider, ISidebarMenuItem } from '../../providers/sidebarMenu';

export interface ISideBarMenuProps {
  items: ISidebarMenuItem[];
}

const defaultSidebarItem: ISidebarMenuItem[] = [
  {
    key: 'item1',
    title: 'My Menu Item'
  }
];

export const ConfigurableSidebarMenu: FC = () => {
  return (
    <ConfigurableComponentProvider>
      <ConfigurableComponent<ISideBarMenuProps>
        defaultSettings={{
          items: defaultSidebarItem
        }}
        
      >
        {(componentState, BlockOverlay) => (
          <ErrorBoundary>
            <div className={`sidebar ${componentState.wrapperClassName}`}>
              <BlockOverlay></BlockOverlay>
              <SidebarMenuProvider items={componentState.settings?.items || []}>
                <SidebarMenu>
                </SidebarMenu>
              </SidebarMenuProvider>
            </div>
          </ErrorBoundary>
        )}
      </ConfigurableComponent>
    </ConfigurableComponentProvider>
  );
};

export default ConfigurableSidebarMenu;
