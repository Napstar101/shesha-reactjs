import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import NotesRenderer, { INotesRendererProps } from './';
import { GlobalStateProvider, NotesProvider, ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';

export default {
  title: 'Components/Temp/NotesRenderer',
  component: NotesRenderer,
} as Meta;

const customFileProps: INotesRendererProps = {};

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<INotesRendererProps> = args => (
  <GlobalStateProvider>
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer>
        <NotesProvider ownerId="32e2b3dd-4d99-4542-af71-134ec7c0e2ce" ownerType="Shesha.Core.Person" {...args}>
          <NotesRenderer />
        </NotesProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  </GlobalStateProvider>
);

export const Basic = Template.bind({});
Basic.args = { ...customFileProps };
