import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import MainLayout, { IMainLayoutProps } from './';

export default {
  title: 'Components/Layout',
  component: MainLayout,
} as Meta;

const defaultProps: IMainLayoutProps = {
  title: 'Default layout',
  heading: 'This is the header',
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IMainLayoutProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <MainLayout {...args} title="Any title">
        <div>This is a div</div>
      </MainLayout>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const Default = Template.bind({});

Default.args = { ...defaultProps };

export const IndexPage = Template.bind({});

const indexPageProps: IMainLayoutProps = {};

IndexPage.args = { ...indexPageProps };