import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ICustomFileProps } from '../customFile';
import BasicToolbar from '.';
import { StepForwardOutlined } from '@ant-design/icons';

export default {
  title: 'Components/Temp/BasicToolbar',
  component: BasicToolbar,
} as Meta;

const customFileProps: ICustomFileProps = {};

const Template: Story<ICustomFileProps> = args => (
  <BasicToolbar items={[
    {
      id: 'string',
      title: 'ReactNode',
      icon: <StepForwardOutlined />
    },
    {
      id: 'string',
      title: 'ReactNode 2',
      icon: <StepForwardOutlined />
    }
  ]} />
);

export const Basic = Template.bind({});

Basic.args = { ...customFileProps };
