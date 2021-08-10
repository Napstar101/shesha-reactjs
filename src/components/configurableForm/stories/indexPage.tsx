import React from 'react';
import { Story } from '@storybook/react';
import ConfigurableForm from '../configurableForm';
import { ISidebarMenuItem } from '../../../interfaces';
import { ShaApplicationProvider, SidebarMenuDefaultsProvider } from '../../../providers';
import AuthContainer from '../../authedContainer';
import { MainLayout } from '../..';

export interface IIndexPageTemplateProps {
  backendUrl: string;
  formPath: string;
}
export const IndexPageTemplate: Story<IIndexPageTemplateProps> = props => {
  const defaultItems: ISidebarMenuItem[] = [
    {
      key: 'item1',
      title: 'Item 1',
      target: '/page1',
    },
    {
      key: 'item2',
      title: 'Item 2',
      target: '/page2',
    },
    {
      key: 'item3',
      title: 'Item 3',
      target: '/page3',
    },
  ];
  return (
    <ShaApplicationProvider backendUrl={props.backendUrl}>
      <AuthContainer layout={true}>
        <SidebarMenuDefaultsProvider items={defaultItems}>
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
                    actionArgs,
                  });
                },
              }}
            ></ConfigurableForm>
          </MainLayout>
        </SidebarMenuDefaultsProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};
