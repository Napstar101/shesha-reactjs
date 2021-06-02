import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import Autocomplete, { IAutocompleteProps } from './';
import { Form } from 'antd';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
} as Meta;

const autocompleteProps: IAutocompleteProps = {
  dataSourceType: 'entitiesList',
};

// Create a master template for mapping args to render the Button component
const Template: Story<IAutocompleteProps> = args => (
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
    >
      <Form.Item label="Autocomplete">
        <Autocomplete {...args} />
      </Form.Item>
    </Form>
  </div>
);

export const BasicIconPicker = Template.bind({});
BasicIconPicker.args = { ...autocompleteProps };
