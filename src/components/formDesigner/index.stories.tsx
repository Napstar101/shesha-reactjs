import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import FormDesigner from './formDesigner';
import { FormProvider, ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';

export default {
  title: 'Components/Temp/FormDesigner',
  component: FormDesigner,
} as Meta;

export interface IFormDesignerStoryProps {
  formPath: string;
}

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IFormDesignerStoryProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <FormProvider path={args.formPath} mode="designer">
        <FormDesigner />
      </FormProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const TableContextProps = Template.bind({});

TableContextProps.args = {
  formPath: 'D:\\Boxfusion\\Shesha3\\opensource\\shesha-reactjs-columns-editor\\src\\components\\formDesigner\\components\\dataTable\\tableContext\\settingsForm.json'
};

export const IndexPage = Template.bind({});
const indexPageProps: IFormDesignerStoryProps = {
  formPath: '/indexTable',
};
IndexPage.args = { ...indexPageProps };
