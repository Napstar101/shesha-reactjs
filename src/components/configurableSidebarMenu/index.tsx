import React, { FC } from 'react';
import { ConfigurableComponent } from '../appConfigurator/configurableComponent';
import { ErrorBoundary } from '../errorBoundary/errorBoundary';
import { SidebarMenu } from '../sidebarMenu';
import { createConfigurableComponent } from '../../providers/configurableComponent';
import { SidebarMenuProvider, ISidebarMenuItem } from '../../providers/sidebarMenu';

export interface ISideBarMenuProps {
  items: ISidebarMenuItem[];
}

const defaultSidebarProps: ISideBarMenuProps = {
  items: [
    {
      key: 'item1',
      title: 'Item 1'
    },
    {
      key: 'item2',
      title: 'Item 2'
    }
  ]
}

const { ConfigurableComponentProvider } = createConfigurableComponent<ISideBarMenuProps>(defaultSidebarProps);

export const ConfigurableSidebarMenu: FC = () => {
  return (
    <ErrorBoundary>
      <ConfigurableComponentProvider>
        <ConfigurableComponent<ISideBarMenuProps>>
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
      </ConfigurableComponentProvider>
    </ErrorBoundary>
  );
};

export default ConfigurableSidebarMenu;
