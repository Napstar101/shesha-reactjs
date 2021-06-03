import React from 'react';
import { Story } from '@storybook/react';
import ConfigurableForm from '../configurableForm';
import { ShaApplicationProvider } from '../../../providers';
import AuthContainer2 from '../../authedContainer2';
import { MainLayout } from '../..';

export interface IIndexPageTemplateProps {
  backendUrl: string;
  formPath: string;
}
export const IndexPageTemplate: Story<IIndexPageTemplateProps> = props => (
  <ShaApplicationProvider backendUrl={props.backendUrl}>
    <AuthContainer2 layout={false}>
      <MainLayout title="Configurable index page">
        <ConfigurableForm
          mode="edit"
          path={props.formPath}
          actions={{
            test: () => {
              console.log('test acton executed');
            },
          }}
        ></ConfigurableForm>
      </MainLayout>
    </AuthContainer2>
  </ShaApplicationProvider>
);