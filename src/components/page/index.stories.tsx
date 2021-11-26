import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider, SidebarMenuDefaultsProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import Page, { IPageProps } from './';
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

//#region Without Layout
// Create a master template for mapping args to render the Button component
const Template: Story<IPageProps> = args => (
  <ShaApplicationProvider backendUrl={process.env.STORYBOOK_BASE_URL} applicationName="Storybook">
    <AuthContainer layout={true}>
      <SidebarMenuDefaultsProvider items={[]}>
        <Page {...args} title="Any title" toolbarItems={toolbarItems} headerTagList={headerTagList} backUrl="/">
          <div>This is a div</div>
        </Page>
      </SidebarMenuDefaultsProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);
export const Default = Template.bind({});

const TestTemplate: Story<IPageProps> = () => <div>This is a div</div>;

TestTemplate.args = { ...defaultProps };
