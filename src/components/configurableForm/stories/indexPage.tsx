import React from 'react';
import { Story } from '@storybook/react';
import ConfigurableForm from '../configurableForm';
import { ShaApplicationProvider } from '../../../providers';
import AuthContainer from '../../authedContainer';
import { MainLayout } from '../..';

export interface IIndexPageTemplateProps {
  backendUrl: string;
  formPath: string;
}
export const IndexPageTemplate: Story<IIndexPageTemplateProps> = props => (
  <ShaApplicationProvider backendUrl={props.backendUrl}>
    <AuthContainer layout={false}>
      <MainLayout title="Configurable index page">
        <ConfigurableForm
          mode="edit"
          path={props.formPath}
          actions={{
            test: () => {
              console.log('test acton executed');
            },
            customSubmit: (values, actionArgs) => {
              console.log({
                msg: 'customSubmit',
                values,
                actionArgs
              });
            }
          }}
        ></ConfigurableForm>
      </MainLayout>
    </AuthContainer>
  </ShaApplicationProvider>
);