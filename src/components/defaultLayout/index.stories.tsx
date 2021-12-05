import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider, SidebarMenuDefaultsProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import DefaultLayout, { IDefaultLayoutProps } from './';
import { SIDEBAR_MENU_ITEMS } from './menuItems';
import Page from '../page';

export default {
  title: 'Components/DefaultLayout',
  component: DefaultLayout,
} as Meta;

const defaultProps: IDefaultLayoutProps = {};

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

//#region Default template
// Create a master template for mapping args to render the Button component
const BasicExampleTemplate: Story<IDefaultLayoutProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={SIDEBAR_MENU_ITEMS}>
        <DefaultLayout {...args}>
          <div>This is a div</div>
        </DefaultLayout>
      </SidebarMenuDefaultsProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);
export const BasicExample = BasicExampleTemplate.bind({});

BasicExample.args = { ...defaultProps };
//#endregion

//#region Default template
// Create a master template for mapping args to render the Button component
const WithPageTemplate: Story<IDefaultLayoutProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={SIDEBAR_MENU_ITEMS}>
        <DefaultLayout {...args}>
          <Page title="Story Page">
            <div>This is a div</div>
          </Page>
        </DefaultLayout>
      </SidebarMenuDefaultsProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);
export const WithPage = WithPageTemplate.bind({});

WithPage.args = { ...defaultProps };
//#endregion
