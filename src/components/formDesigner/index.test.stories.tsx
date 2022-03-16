import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import FormDesigner from './formDesigner';
import { FormProvider, GlobalStateProvider, ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';

export default {
  title: 'Components/TestFormDesigner',
  component: FormDesigner,
} as Meta;

export interface IFormDesignerStoryProps {
  formPath: string;
}

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IFormDesignerStoryProps> = args => (
  <GlobalStateProvider>
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout={true}>
        <FormProvider path={args.formPath} mode="designer">
          <FormDesigner />
        </FormProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  </GlobalStateProvider>
);

export const TableContextProps = Template.bind({});

TableContextProps.args = {
  formPath: '/reports/reporting-report/add-parameter',
};

export const IndexPage = Template.bind({});
const indexPageProps: IFormDesignerStoryProps = {
  formPath: '/indexTable',
};
IndexPage.args = { ...indexPageProps };
