import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider, SidebarMenuDefaultsProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import MainLayout, { IMainLayoutProps } from './';
import { SIDEBAR_MENU_ITEMS } from './menuItems';

export default {
  title: 'Components/MainLayout',
  component: MainLayout,
  argTypes: {},
} as Meta;

const defaultProps: IMainLayoutProps = {
  title: 'Default layout',
  heading: 'This is the header',
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IMainLayoutProps> = args => {
  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout={true}>
        <SidebarMenuDefaultsProvider items={SIDEBAR_MENU_ITEMS}>
          <MainLayout {...args} title="Any title">
            <div>This is a div</div>
          </MainLayout>
        </SidebarMenuDefaultsProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};
export const Default = Template.bind({});

Default.args = { ...defaultProps };

// // Create a master template for mapping args to render the Button component
// const WithIndexTable: Story<IMainLayoutProps> = () => (
//   <ShaApplicationProvider backendUrl={backendUrl}>
//     <AuthContainer layout={true}>
//       <SidebarMenuDefaultsProvider items={SIDEBAR_MENU_ITEMS}>
//         <SimpleIndexPage loading={false} tableConfigId="Users_Index" title="Invoice Allocations" />
//       </SidebarMenuDefaultsProvider>
//     </AuthContainer>
//   </ShaApplicationProvider>
// );

// export const IndexPage = WithIndexTable.bind({});
