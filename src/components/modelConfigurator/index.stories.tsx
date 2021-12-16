import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { ModelConfigurator, IModelConfiguratorProps } from './';
import { ModelConfiguratorProvider } from '../../providers/modelConfigurator';

export default {
  title: 'Components/ModelConfigurator',
  component: ModelConfigurator,
} as Meta;

const defaultProps: IModelConfiguratorProps = {
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IModelConfiguratorProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <ModelConfiguratorProvider items={[]}>
        <ModelConfigurator {...args}>
          <div>This is a div</div>
        </ModelConfigurator>
      </ModelConfiguratorProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);
export const Default = Template.bind({});

Default.args = { ...defaultProps };