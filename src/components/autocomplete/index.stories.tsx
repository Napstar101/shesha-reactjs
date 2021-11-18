import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import Autocomplete, { IAutocompleteProps } from './';
import { Button, Form } from 'antd';
import AuthContainer from '../authedContainer';
import { ShaApplicationProvider } from '../../providers';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
} as Meta;

const autocompleteProps: IAutocompleteProps = {
  dataSourceType: 'url',
  dataSourceUrl: '/api/v1/BursMan/ScheduleVisits/MembersAutocomplete',
  // dataSourceType: 'entitiesList',
  // allowInherited: true,
  // typeShortAlias: 'Gma.Member',
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IAutocompleteProps> = args => {
  const [state, setState] = useState({});

  const [form] = Form.useForm();

  const onFinish = (data: any) => {
    console.log('onFinish data ', data);
    setState(data);
  };

  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer>
        <div style={{ width: 500 }}>
          <Form
            {...{
              labelCol: {
                xs: { span: 24 },
                md: { span: 8 },
                sm: { span: 8 },
              },
              wrapperCol: {
                xs: { span: 24 },
                md: { span: 16 },
                sm: { span: 16 },
              },
            }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item label="Autocomplete (Multiple)" name="multipleAutocomplete">
              <Autocomplete {...args} mode="multiple" />
            </Form.Item>

            <Form.Item label="Autocomplete (Single)" name="singleAutocomplete">
              <Autocomplete {...args} />
            </Form.Item>

            <Button
              onClick={() =>
                form?.setFieldsValue({
                  singleAutocomplete: {
                    displayText: 'Khethiwe Mkhabela',
                    id: 'bdc0caab-05e2-4677-9e3c-0af9b1fdbc57',
                  },
                  multipleAutocomplete: [
                    {
                      displayText: 'Khethiwe Mkhabela',
                      id: 'bdc0caab-05e2-4677-9e3c-0af9b1fdbc57',
                    },
                    {
                      displayText: 'BRIDGETTE NGOBENI',
                      id: 'd1a61556-b22b-403b-ab35-ac7789c89f14',
                    },
                  ],
                })
              }
            >
              Set Fields
            </Button>

            <Button onClick={() => form?.resetFields()} style={{ margin: '0 12px' }}>
              Clear fields
            </Button>

            <Button onClick={() => form?.submit()} type="primary">
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export const BasicIconPicker = Template.bind({});
BasicIconPicker.args = { ...autocompleteProps };
