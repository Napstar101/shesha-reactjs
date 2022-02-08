import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import MultiPurposePicker, { IMultiPurposePicker } from '.';
import { IMultiPurposePickerProps } from '../../interfaces';
import CollapsiblePanel from '../collapsiblePanel';

export default {
  title: 'Components/MultiPurposePicker',
  component: MultiPurposePicker,
  argTypes: {},
} as Meta;

const SingleSelectProps: IMultiPurposePickerProps[] = [
  {
    mode: null,
    defaultOpen: false,
  },
];

const MultiSelectProps: IMultiPurposePickerProps[] = [
  {
    mode: 'multiple',
    defaultOpen: false,
  },
];

const MultiSelectDefaultOpen: IMultiPurposePickerProps[] = [
  {
    mode: 'multiple',
    defaultOpen: true,
  },
];

// Create a master template for mapping args to render the Selector component
const Template1: Story<IMultiPurposePicker> = args => <MultiPurposePicker items={SingleSelectProps} {...args} />;
const Template2: Story<IMultiPurposePicker> = args => <MultiPurposePicker items={MultiSelectProps} {...args} />;
const Template3: Story<IMultiPurposePicker> = args => <MultiPurposePicker items={MultiSelectDefaultOpen} {...args} />;

// Reuse that template for creating different stories
export const SingleSelect = Template1.bind({});
SingleSelect.args = {};

export const MultiSelect = Template2.bind({});
MultiSelect.args = {};

export const MultiSelectOpen = Template3.bind({});
MultiSelect.args = {};
