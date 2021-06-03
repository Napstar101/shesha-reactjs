import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import NotesRenderer, { INotesRendererProps } from './';
import { NotesProvider, ShaApplicationProvider } from '../../providers';
import AuthContainer2 from '../authedContainer2';

export default {
  title: 'Components/Temp/NotesRenderer',
  component: NotesRenderer,
} as Meta;

const customFileProps: INotesRendererProps = {};

const backendUrl = 'http://localhost:21021'; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<INotesRendererProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer2>
      <NotesProvider ownerId="32e2b3dd-4d99-4542-af71-134ec7c0e2ce" ownerType="Shesha.Core.Person" {...args}>
        <NotesRenderer />
      </NotesProvider>
    </AuthContainer2>
  </ShaApplicationProvider>
);

export const Basic = Template.bind({});
Basic.args = { ...customFileProps };
