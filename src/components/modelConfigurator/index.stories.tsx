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

export const PersonModel = addStory(Template, {
  id: '0789BFDA-2864-451B-BC38-9F58F70BA11A',
});

export const EntityPropertyModel = addStory(Template, {
  id: '45AE2FE8-255B-462E-BDD8-FDA5C591AE08',
});

export const School = addStory(Template, {
  id: 'AA6ADB56-668A-4D7B-917E-2FFB4ED36C2C',
});