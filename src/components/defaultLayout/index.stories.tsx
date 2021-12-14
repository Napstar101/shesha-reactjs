import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { DataTableProvider, ShaApplicationProvider, SidebarMenuDefaultsProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import DefaultLayout, { IDefaultLayoutProps } from './';
// import { SIDEBAR_MENU_ITEMS } from './menuItems';
import Page from '../page';
import IndexTableFull from '../indexTableFull';

export default {
  title: 'Components/DefaultLayout',
  component: DefaultLayout,
} as Meta;

const defaultProps: IDefaultLayoutProps = {};

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

//#region Default template
// Create a master template for mapping args to render the Button component
const BasicExampleTemplate: Story<IDefaultLayoutProps> = () => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={[]}>
        <DefaultLayout __hideHeader>
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
const WithPageTemplate: Story<IDefaultLayoutProps> = () => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={[]}>
        <DefaultLayout __hideHeader>
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
//#region Default template
// Create a master template for mapping args to render the Button component
const WithTableTemplate: Story<IDefaultLayoutProps> = () => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={[]}>
        <DefaultLayout __hideHeader>
          <Page noPadding>
            <DataTableProvider tableId="Users_Index" title="Story Page">
              <IndexTableFull id={'Users_Index'} />
            </DataTableProvider>
          </Page>
        </DefaultLayout>
      </SidebarMenuDefaultsProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);
export const WithTable = WithTableTemplate.bind({});

WithTable.args = { ...defaultProps };
//#endregion
