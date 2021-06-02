import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ConfigurableLogo from './';
import { AppConfiguratorProvider } from '../../providers';

export default {
  title: 'Components/Temp/ConfigurableLogo',
  component: ConfigurableLogo,
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story = () => (
  <AppConfiguratorProvider>
    <ConfigurableLogo />
  </AppConfiguratorProvider>
);

export const Basic = Template.bind({});
