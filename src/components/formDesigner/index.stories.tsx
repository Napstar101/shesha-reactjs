import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import FormDesigner, { IFormDesignerProps } from './formDesigner';
import { AppConfiguratorProvider, FormProvider, ShaApplicationProvider, ShaRoutingProvider } from '../../providers';
import AuthContainer2 from '../authedContainer2';

export default {
  title: 'Components/Temp/FormDesigner',
  component: FormDesigner,
} as Meta;

const formDesignerProps: IFormDesignerProps = {};

const backendUrl = 'http://testdsdnpobe.boxfusion.co.za'; // TODO: Make this configurable
// const backendUrl = 'http://localhost:21021'; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IFormDesignerProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer2>
      <ShaRoutingProvider>
        <AppConfiguratorProvider>
          <FormProvider id="f1e6f97c-dd59-41e0-a3b7-d4657dd92a56" mode="designer">
            <FormDesigner />
          </FormProvider>
        </AppConfiguratorProvider>
      </ShaRoutingProvider>
    </AuthContainer2>
  </ShaApplicationProvider>
);

export const BasicIconPicker = Template.bind({});
BasicIconPicker.args = { ...formDesignerProps };
