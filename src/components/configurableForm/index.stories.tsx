import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ConfigurableForm from './configurableForm';
import { Col, Row } from 'antd';
import { IConfigurableFormProps } from './models';
import { AppConfiguratorProvider, ShaApplicationProvider, ShaRoutingProvider } from '../../providers';
import AuthContainer2 from '../authedContainer2';

export default {
  title: 'Components/Temp/ConfigurableForm',
  component: ConfigurableForm,
} as Meta;

const configurableFormProps: IConfigurableFormProps = {
  mode: 'edit',
};

const backendUrl = 'http://testdsdnpobe.boxfusion.co.za'; // Just for configuring Storybook
// const backendUrl = 'http://localhost:21021';

// Create a master template for mapping args to render the Button component
const Template: Story<IConfigurableFormProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer2>
      <Row>
        <Col span={8} offset={8}>
          <AppConfiguratorProvider>
            <ShaRoutingProvider>
              <ConfigurableForm {...args} id="f1e6f97c-dd59-41e0-a3b7-d4657dd92a56"></ConfigurableForm>
            </ShaRoutingProvider>
          </AppConfiguratorProvider>
        </Col>
      </Row>
    </AuthContainer2>
  </ShaApplicationProvider>
);

export const Basic = Template.bind({});
Basic.args = { ...configurableFormProps };
