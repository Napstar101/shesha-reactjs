import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { DataTableProvider, ShaApplicationProvider, UiProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { GenericDetailsPage, GenericIndexPage, SimpleIndexPage } from '../..';
import { IIndexPageProps } from './indexPage';
import { useAreaCreate } from '../../apis/area';
import { useState } from 'react';
import MainLayout from '../mainLayout';
import IndexTableFull from '../indexTableFull';
import { PlusOutlined } from '@ant-design/icons';

export default {
  title: 'Components/CrudViews/IndexView',
  component: GenericDetailsPage,
} as Meta;

const id = '26f7507e-efa3-49eb-aa0c-775668f49370';

const configurableFormProps = {
  id,
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IIndexPageProps> = () => {
  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout>
        <UiProvider>
          <GenericIndexPage
            title="All Areas"
            tableConfigId="GmaAreas_Index"
            createModalProps={{
              updater: useAreaCreate,
              formPath: '/areas/create',
              // keepModalOpenAfterSave: true,
              title:"Add new area"
            }}
          />
        </UiProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

interface IRowSelectionState {
  selectedRowIndex?: number,
  row?: any,
  enableCreatePaymentPack?: boolean;
}

// Create a master template for mapping args to render the Button component
const RowSelectionsTemplate: Story<IIndexPageProps> = () => {
  const [rowSelectionState, setRowSelectionState] = useState<IRowSelectionState>({});

  const onSelectRow = (index: number, row: any) => {
    setRowSelectionState({
      selectedRowIndex: index, 
      row
    });
  }

  console.log('rowSelectionState: ', rowSelectionState);

  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout>
        <UiProvider>
          <SimpleIndexPage
            title="All Payments"
            id="Invoice_Index"
            tableConfigId="Invoice_Index"
            toolbarItems={[{
              title: 'Create Payment Pack',
              icon: <PlusOutlined />,
              disabled: !rowSelectionState?.enableCreatePaymentPack,
            }]}
            onSelectRow={onSelectRow}
            selectedRowIndex={rowSelectionState.selectedRowIndex}
          />
        </UiProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export const Basic = Template.bind({});
Basic.args = { ...configurableFormProps };

export const IndexPage = Template.bind({});
IndexPage.args = {
  backendUrl: backendUrl,
  formPath: '/indexTable',
};

export const WithRowSelectionsTemplate = RowSelectionsTemplate.bind({});
WithRowSelectionsTemplate.args = { ...configurableFormProps };
// tableConfigId="Invoice_Index" title="All Invoices"
//             createModalProps={{
//               updater: useAreaCreate,
//               formPath: '/areas/create',
//               // keepModalOpenAfterSave: true,
//               title:"Add new area"
//             }}
          
//             tableRowSelectionProps={{
//               selectedRowIndex: rowSelectionState?.selectedRowIndex,
//               // onSelectRow: rowSelectionState?.row,
//               onSelectRow,
//             }}