import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { GenericDetailsPage, GenericIndexPage, GlobalStateProvider } from '../..';
import { IGenericIndexPageProps } from '../crudViews/indexPage';

export default {
  title: 'Components/MainLayout',
  component: GenericDetailsPage,
} as Meta;

const id = '26f7507e-efa3-49eb-aa0c-775668f49370';

const configurableFormProps = {
  id,
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IGenericIndexPageProps> = () => {
  return (
    <GlobalStateProvider>
      <ShaApplicationProvider backendUrl={backendUrl}>
        <AuthContainer layout>
          <>
            <GenericIndexPage
              title="Members"
              tableConfigId="Members_Index"
              // tableConfigId="Members_Index"
              detailsUrl={currentId => `/members/details?id=${currentId}`}
              editUrl={currentId => `/members/edit?id=${currentId}`}
            />
          </>
        </AuthContainer>
      </ShaApplicationProvider>
    </GlobalStateProvider>
  );
};

export const Basic = Template.bind({});
Basic.args = { ...configurableFormProps };

export const IndexPage = Template.bind({});

IndexPage.args = {
  backendUrl,
  formPath: '/indexTable',
};
