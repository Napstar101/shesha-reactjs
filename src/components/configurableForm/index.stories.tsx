import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ConfigurableForm from '.';
import { Button, Col, Form, Row } from 'antd';
import { IConfigurableFormProps } from './models';
import { ShaApplicationProvider, StoredFilesProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { IndexPageTemplate } from './stories/indexPage';
import StoredFilesRenderer from '../storedFilesRenderer';
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
    console.log('onFinish data: ', JSON.stringify(data, null, 2));
  };

  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer>
        
          <Row>
            <Col span={24}>
              <ConfigurableForm
                mode="edit"
                path="/settings/forms/playground"
                onFinish={onFinish}
                form={form}
                sections={{
                  middleSection: () => (
                    <StoredFilesProvider ownerId="0bfb4b64-3e83-4765-802d-7f98601c2453" ownerType="BursMan.PaymentPack">
                      <StoredFilesRenderer isDragger={false} />
                    </StoredFilesProvider>
                  ),
                }}
                
                initialValues={{
                  scheduleDateStart: '2021-10-30T00:40:40.317Z',
                  scheduleDateEnd: '2021-09-12T00:40:40.317Z',
                  scheduleDate: ['2021-10-30T00:40:40.317Z', '2021-09-12T00:40:40.317Z'],
                  gender: [{ itemValue: 1 }],
                  numOfStudents: 23232,
                  numOfTeachers: 131,
                  numOfClasses: 75,
                  numOfOfficers: 16,
                  numOfRepeatingStudents: 37,
                  numOfNewStudents: 200,
                  numOfMatricStudents: 102,
                }}
              />

              <Button onClick={() => form?.submit()} type="primary">
                Submit
              </Button>
            </Col>
          </Row>
        
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
