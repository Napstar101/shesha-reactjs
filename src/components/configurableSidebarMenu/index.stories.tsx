import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ConfigurableSidebarMenu from './';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { AppEditModeToggler } from '../..';
import SidebarConfigurator from './configurator';
import { SidebarMenuConfiguratorProvider } from '../../providers/sidebarMenuConfigurator';

export default {
  title: 'Components/ConfigurableSidebarMenu',
  component: ConfigurableSidebarMenu,
} as Meta;

export interface IConfigurableSidebarMenuProps {
  backendUrl: string;
}

// Create a master template for mapping args to render the component
const Template: Story<IConfigurableSidebarMenuProps> = (props) => (
  <ShaApplicationProvider 
    backendUrl={props.backendUrl || ''}
  >
    <AuthContainer layout={false}>
      <AppEditModeToggler />
      <ConfigurableSidebarMenu 
        id="9362F11A-EA9C-4152-9855-9516123467F7"
        defaultSettings={{
          items: [
            {
              id: 'item1',
              title: 'Item 1',
              itemType: 'button',
              childItems: undefined,
            },
            {
              id: 'item2',
              title: 'Item 2',
              itemType: 'button',
              childItems: undefined,
            },
          ]
        }}
      />
    </AuthContainer>
  </ShaApplicationProvider>
);

export const Basic = Template.bind({});
Basic.args = { 
  backendUrl: process.env.STORYBOOK_BASE_URL,
};


export interface IConfiguratorTemplateProps {
  backendUrl: string;
}

// Create a master template for mapping args to render the component
const ConfiguratorTemplate: Story<IConfiguratorTemplateProps> = (props) => (
  <ShaApplicationProvider 
    backendUrl={props.backendUrl || ''}
  >
    <AuthContainer layout={false}>
      <SidebarMenuConfiguratorProvider items={[]}>
        <SidebarConfigurator></SidebarConfigurator>
      </SidebarMenuConfiguratorProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const Configurator = ConfiguratorTemplate.bind({});
Configurator.args = { 
  backendUrl: process.env.STORYBOOK_BASE_URL,
};
