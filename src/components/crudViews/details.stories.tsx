import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { GenericDetailsPage, IGenericDetailsPageProps } from '../..';
//import { usePersonGet } from '../../apis/person';
import { usePersonTestGet } from '../../apis/personTest';
import { addStory } from '../../stories/utils';

export default {
  title: 'Components/CrudViews/DetailsView',
  component: GenericDetailsPage,
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IGenericDetailsPageProps> = (props) => {
  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout>
        <>
          <GenericDetailsPage
            title={() => 'User Details'}
            id={props.id}
            fetcher={props.fetcher}
            formPath={props.formPath}
          />
        </>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export const Base = addStory(Template, {
  id: 'B3B60F2E-5B88-4F44-B8EB-D3987A8483D9',
  formPath: '/persons/details',
  fetcher: usePersonTestGet,
});