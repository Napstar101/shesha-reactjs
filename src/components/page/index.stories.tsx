import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider, SidebarMenuDefaultsProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import Page, { IBreadcrumbItem, IPageProps } from './';
import { IToolbarItem } from '../..';
import { CloseOutlined, DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { ITagProps } from './pageHeaderTag';

export default {
  title: 'Components/Page',
  component: Page,
} as Meta;

const defaultProps: IPageProps = {
  title: 'Default layout',
};

const toolbarItems: IToolbarItem[] = [
  {
    title: 'Save',
    icon: <SaveOutlined />,
  },
  {
    title: 'Save',
    icon: <CloseOutlined />,
  },
  {
    title: 'Export to Excel',
    icon: <DownloadOutlined />,
  },
];

const headerTagList: ITagProps[] = [
  {
    title: 'Date registered',
    tag: 'some tag',
  },
  {
    title: 'Payment Status',
    tag: {
      color: 'blue',
      text: 'PAID',
    },
  },
];

const breadcrumbItems: IBreadcrumbItem[] = [
  {
    text: 'Home',
    link: '#',
  },
  {
    text: 'Application Center',
    link: '#',
  },
  {
    text: 'Application List',
    link: '#',
  },
  {
    text: 'An Application',
  },
];

//#region Default
const BasicTemplate: Story<IPageProps> = args => (
  <ShaApplicationProvider backendUrl={process.env.STORYBOOK_BASE_URL} applicationName="Storybook">
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={[]}>
        <Page {...args} title="Any title">
          <div>This is a div</div>
        </Page>
      </SidebarMenuDefaultsProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const Basic = BasicTemplate.bind({ ...defaultProps });
//#endregion

//#region WithToolBarItem
const WithToolBarItemTemplate: Story<IPageProps> = args => (
  <ShaApplicationProvider backendUrl={process.env.STORYBOOK_BASE_URL} applicationName="Storybook">
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={[]}>
        <Page {...args} title="Any title" toolbarItems={toolbarItems}>
          <div>This is a div</div>
        </Page>
      </SidebarMenuDefaultsProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const WithToolBarItem = WithToolBarItemTemplate.bind({ ...defaultProps });
//#endregion

//#region WithToolBarItem
const WithHeaderListTemplate: Story<IPageProps> = args => (
  <ShaApplicationProvider backendUrl={process.env.STORYBOOK_BASE_URL} applicationName="Storybook">
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={[]}>
        <Page {...args} title="Any title" headerTagList={headerTagList}>
          <div>This is a div</div>
        </Page>
      </SidebarMenuDefaultsProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const WithHeaderList = WithHeaderListTemplate.bind({ ...defaultProps });
//#endregion

//#region WithToolBarItem
const WithBackButtonTemplate: Story<IPageProps> = args => (
  <ShaApplicationProvider backendUrl={process.env.STORYBOOK_BASE_URL} applicationName="Storybook">
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={[]}>
        <Page {...args} title="Any title" backUrl="/">
          <div>This is a div</div>
        </Page>
      </SidebarMenuDefaultsProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const WithBackButton = WithBackButtonTemplate.bind({ ...defaultProps });
//#endregion

//#region WithToolBarItem
const CompleteExampleTemplate: Story<IPageProps> = args => (
  <ShaApplicationProvider backendUrl={process.env.STORYBOOK_BASE_URL} applicationName="Storybook">
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={[]}>
        <Page
          {...args}
          title="Any title"
          toolbarItems={toolbarItems}
          headerTagList={headerTagList}
          breadcrumbItems={breadcrumbItems}
          backUrl="/"
        >
          <div>This is a div</div>
        </Page>
      </SidebarMenuDefaultsProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const CompleteExample = CompleteExampleTemplate.bind({ ...defaultProps });
//#endregion
