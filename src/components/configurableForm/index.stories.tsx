import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ConfigurableForm from './configurableForm';
import { Col, Row } from 'antd';
import { IConfigurableFormProps } from './models';
import { ShaApplicationProvider, ShaRoutingProvider } from '../../providers';
import AuthContainer2 from '../authedContainer2';
import { IndexPageTemplate } from './stories/indexPage';

export default {
  title: 'Components/ConfigurableForm',
  component: ConfigurableForm,
} as Meta;

const configurableFormProps: IConfigurableFormProps = {
  mode: 'edit',
};

const backendUrl = 'http://localhost:21021'; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IConfigurableFormProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer2>
      <Row>
        <Col span={8} offset={8}>
          <ShaRoutingProvider>
            <ConfigurableForm {...args} path="/administration/user-management/createModal"></ConfigurableForm>
          </ShaRoutingProvider>
        </Col>
      </Row>
    </AuthContainer2>
  </ShaApplicationProvider>
);

export const Basic = Template.bind({});
Basic.args = { ...configurableFormProps };

export const IndexPage = IndexPageTemplate.bind({});
IndexPage.args = {
  backendUrl: backendUrl,
  formPath: '/indexTable',
};
