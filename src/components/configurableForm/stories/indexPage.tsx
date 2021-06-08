import React from 'react';
import { Story } from '@storybook/react';
import ConfigurableForm from '../configurableForm';
import { ISidebarMenuItem, ShaApplicationProvider, SidebarMenuDefaultsProvider } from '../../../providers';
import AuthContainer2 from '../../authedContainer2';
import { MainLayout } from '../..';

export interface IIndexPageTemplateProps {
  backendUrl: string;
  formPath: string;
}
export const IndexPageTemplate: Story<IIndexPageTemplateProps> = props => {
  const defaultItems: ISidebarMenuItem[] = [
    {
      id: 'item1',
      name: 'Item 1',
      itemType: 'button',
      targetUrl: '/page1'
    },
    {
      id: 'item2',
      name: 'Item 2',
      itemType: 'button',
      targetUrl: '/page2'
    },
    {
      id: 'item3',
      name: 'Item 3',
      itemType: 'button',
      targetUrl: '/page3'
    },
  ];
  return (
    <ShaApplicationProvider backendUrl={props.backendUrl}>
      <AuthContainer2 layout={true}>
        <SidebarMenuDefaultsProvider items={defaultItems}>
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
        </SidebarMenuDefaultsProvider>
      </AuthContainer2>
    </ShaApplicationProvider>
  );
};