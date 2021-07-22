import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ConfigurableForm from './configurableForm';
import { Col, Form, Row } from 'antd';
import { IConfigurableFormProps } from './models';
import { ShaApplicationProvider, ShaRoutingProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { IndexPageTemplate } from './stories/indexPage';
// import { useApplicationsApplyForMembership } from '../../apis/applications';
import { useMutate } from 'restful-react';

const useApplyForMembership = () => {
  const fetcher = useMutate({
    path: '/api/services/Gma/Applications/ApplyForMembership',
    verb: 'POST',
  });

  return fetcher;
};

export default {
  title: 'Components/ConfigurableForm',
  component: ConfigurableForm,
} as Meta;

const configurableFormProps: IConfigurableFormProps = {
  mode: 'edit',
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IConfigurableFormProps> = args => {
  const [form] = Form.useForm();

  const { loading, mutate } = useMutate({
    path: '/api/services/Gma/Applications/ApplyForMembership',
    verb: 'POST',
  });

  const onFinish = (data: any) => {
    mutate(data)
      .then(response => {
        console.log('rest response', response);
      })
      .catch(error => {
        console.log('rest error: ', error);
      });
  };

  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer>
        <ShaRoutingProvider>
          <Row>
            <Col span={24}>
              <ConfigurableForm mode="edit" path="/members/apply" onFinish={onFinish} form={form} />
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
