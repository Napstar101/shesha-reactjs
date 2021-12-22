import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { MetadataDispatcherProvider, ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { ModelConfigurator, IModelConfiguratorProps } from './';
import { addStory } from '../../stories/utils';

export default {
  title: 'Components/ModelConfigurator',
  component: ModelConfigurator,
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IModelConfiguratorProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <MetadataDispatcherProvider>
          <ModelConfigurator {...args}>
          </ModelConfigurator>
      </MetadataDispatcherProvider>
    </AuthContainer>
  </ShaApplicationProvider >
);

export const NewModel = addStory(Template, {
});

export const ExistingModel = addStory(Template, {
  id: '9353E349-6904-4C09-A679-9D02A350CF62',
});