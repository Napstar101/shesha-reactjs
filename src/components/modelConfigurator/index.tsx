import { Form } from 'antd';
import React, { FC } from 'react';
import { ModelConfiguratorProvider } from '../..';
import { ModelConfiguratorRenderer } from './renderer';

export interface IModelConfiguratorProps {
  id?: string;
  name?: string;
  nameSpace?: string;
}

export const ModelConfigurator: FC<IModelConfiguratorProps> = (props) => {
  const [form] = Form.useForm();
  return (
    <ModelConfiguratorProvider 
      id={props.id}
      form={form}
    >
      <ModelConfiguratorRenderer></ModelConfiguratorRenderer>
    </ModelConfiguratorProvider>
  );
};

export default ModelConfigurator;