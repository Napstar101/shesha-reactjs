import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ConfigurableLogo from './';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer2 from '../authedContainer2';
import { AppEditModeToggler } from '../..';

export default {
  title: 'Components/ConfigurableLogo',
  component: ConfigurableLogo,
} as Meta;

export interface IConfigurableLogoStoryProps {
  backendUrl: string;
}

// Create a master template for mapping args to render the component
const Template: Story<IConfigurableLogoStoryProps> = (props) => (
  <ShaApplicationProvider 
    backendUrl={props.backendUrl || ''}
  >
    <AuthContainer2 layout={false}>
      <AppEditModeToggler />
      <ConfigurableLogo />
    </AuthContainer2>
  </ShaApplicationProvider>
);

export const Basic = Template.bind({});
Basic.args = { 
  backendUrl: process.env.STORYBOOK_BASE_URL,
};
