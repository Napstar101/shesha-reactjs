import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ConfigurableForm from './configurableForm';
import { Alert, Button, Col, Form, Row } from 'antd';
import { IConfigurableFormProps } from './models';
import { ShaApplicationProvider, ShaRoutingProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { IndexPageTemplate } from './stories/indexPage';
// import { useApplicationsApplyForMembership } from '../../apis/applications';

export default {
  title: 'Components/ConfigurableForm',
  component: ConfigurableForm,
} as Meta;

const configurableFormProps: IConfigurableFormProps = {
  mode: 'edit',
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IConfigurableFormProps> = () => {
  const [form] = Form.useForm();

  const onFinish = (data: any) => {
    console.log('onFinish data: ', data);
  };

  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer>
        <ShaRoutingProvider>
          <Row>
            <Col span={24}>
              <ConfigurableForm
                mode="edit"
                path="/settings/forms/playground"
                onFinish={onFinish}
                form={form}
                sections={{
                  middleSection: () => <Alert message="This is a custom section" description="" />,
                }}
                initialValues={{
                  scheduleDateStart: '2021-10-30T00:40:40.317Z',
                  scheduleDateEnd: '2021-09-12T00:40:40.317Z',
                }}
              />

              <Button onClick={() => form?.submit()} type="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </ShaRoutingProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export const Basic = Template.bind({});
Basic.args = { ...configurableFormProps };

export const IndexPage = IndexPageTemplate.bind({});
IndexPage.args = {
  backendUrl: backendUrl,
  formPath: '/indexTable',
};
