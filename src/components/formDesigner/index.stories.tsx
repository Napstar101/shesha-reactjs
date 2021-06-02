import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import FormDesigner from './formDesigner';
import { FormProvider, ShaApplicationProvider } from '../../providers';
import AuthContainer2 from '../authedContainer2';

export default {
  title: 'Components/Temp/FormDesigner',
  component: FormDesigner,
} as Meta;

export interface IFormDesignerStoryProps {
  formPath: string;
}

const backendUrl = 'http://localhost:21021'; // TODO: Make this configurable
// const backendUrl = 'http://localhost:21021'; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IFormDesignerStoryProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer2 layout={true}>
      <FormProvider path={args.formPath} mode="designer">
        <FormDesigner />
      </FormProvider>
    </AuthContainer2>
  </ShaApplicationProvider>
);

export const ModalEdit = Template.bind({});
const modalProps: IFormDesignerStoryProps = {
  formPath: "/administration/user-management/createModal"
};
ModalEdit.args = { ...modalProps };

export const IndexPage = Template.bind({});
const indexPageProps: IFormDesignerStoryProps = {
  formPath: "/administration/user-management/indexPage"
  //formPath: "D:\\Boxfusion\\shesha-react-new\\src\\components\\formDesigner\\components\\button\\settingsForm.json"
};
IndexPage.args = { ...indexPageProps };
