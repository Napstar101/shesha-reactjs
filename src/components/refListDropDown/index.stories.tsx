import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import RefListDropDown, { IRefListDropDownProps } from './';
import { addStory } from '../../stories/utils';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';

export default {
  title: 'Components/RefListDropDown',
  component: RefListDropDown,
  argTypes: {
    // backgroundColor: { control: 'color' },
    label: {
      description: 'Overwritten description',
      table: {
        type: {
          summary: 'Something short',
          detail: 'Something really really long',
        },
      },
      control: {
        type: null,
      },
    },
  },
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IRefListDropDownProps> = args => {
  const [form] = Form.useForm();
  const [state, setState] = useState(null);

  const onFinish = (data: any) => {
    console.log('onFinish data ', data);
    setState(data);
  };

  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer>
        <Form
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="Dropdown" name="dropdown">
            <RefListDropDown {...args} />
          </Form.Item>
          <Button onClick={() => form?.resetFields()} style={{ margin: '0 12px' }}>
            Reset
          </Button>

          <Button onClick={() => form?.submit()} type="primary">
            Submit
          </Button>
        </Form>
        {Boolean(state) && (
          <div>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>
        )}
      </AuthContainer>
    </ShaApplicationProvider>
  );
}

// Reuse that template for creating different stories
export const Simple = addStory(Template, {
  listNamespace: 'Shesha.Core',
  listName: 'PersonTitles',
})
