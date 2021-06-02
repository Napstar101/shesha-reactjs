import React from 'react';
import { Form } from 'antd';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import RefListDropDown, { IRefListDropDownProps } from './';

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

// Create a master template for mapping args to render the Button component
const Template: Story<IRefListDropDownProps> = args => (
  <Form>
    <Form.Item label="Gender">
      <RefListDropDown {...args} />
    </Form.Item>
  </Form>
);

// Reuse that template for creating different stories
export const Basic = Template.bind({});
Basic.args = { label: 'Basic' };
