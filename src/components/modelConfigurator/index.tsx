import React, { FC } from 'react';
import { ModelConfiguratorProvider } from '../..';
import { ModelConfiguratorRenderer } from './renderer';

export interface IModelConfiguratorProps {
  id?: string;
  name?: string;
  nameSpace?: string;
}

export const ModelConfigurator: FC<IModelConfiguratorProps> = (props) => {
  return (
    <ModelConfiguratorProvider 
      id={props.id}
      name ={ props.name }
      namespace ={ props.nameSpace }
      items={[]}
    >
      <ModelConfiguratorRenderer></ModelConfiguratorRenderer>
    </ModelConfiguratorProvider>
  );
};

export default ModelConfigurator;