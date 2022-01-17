import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { GenericEditPage, IGenericEditPageProps } from '../..';
//import { usePersonGet, usePersonUpdate } from '../../apis/person';
import { usePersonTestGet, /*usePersonTestUpdate, usePersonTestUpdateOpenDynamicDto*/ } from '../../apis/personTest';
import { usePersonTest2UpdateDtoAtRuntime } from '../../apis/personTest2';
import { addStory } from '../../stories/utils';

export default {
  title: 'Components/CrudViews/EditView',
  component: GenericEditPage,
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IGenericEditPageProps> = (props) => {
  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout>
        <>
          <GenericEditPage
            title={() => 'User Edit'}
            id={props.id}
            fetcher={props.fetcher}
            updater={props.updater}
            formPath={props.formPath}
          />
        </>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export const Base = addStory(Template, {
  id: 'B3B60F2E-5B88-4F44-B8EB-D3987A8483D9',
  formPath: '/persons/edit',
  fetcher: usePersonTestGet,
  updater: usePersonTest2UpdateDtoAtRuntime// usePersonTestUpdateOpenDynamicDto,//usePersonTestUpdate,
});