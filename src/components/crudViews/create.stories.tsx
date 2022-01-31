import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { GenericCreatePage, IGenericCreatePageProps } from '../..';
import { usePersonTestCreate } from '../../apis/personTest';
import { addStory } from '../../stories/utils';

export default {
  title: 'Components/CrudViews/CreateView',
  component: GenericCreatePage,
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IGenericCreatePageProps> = (props) => {
  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout>
        <>
          <GenericCreatePage
            title='Create User'
            updater={props.updater}
            formPath={props.formPath}
          />
        </>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export const Base = addStory(Template, {
  formPath: '/persons/create',
  updater: usePersonTestCreate,
});