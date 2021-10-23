import React, { FC } from 'react';
import { IToolboxComponentBase } from '../../interfaces';

export interface IProps {
  component: IToolboxComponentBase;
  index: number;
}

const ToolbarComponent: FC<IProps> = ({ component /*, index*/ }) => {
  const ComponentContent = () => (
    <div>
      {component.icon}
      <span>{component.name}</span>
    </div>
  );

  return (
    <div className="sha-toolbox-component">
      <ComponentContent />
    </div>
  );
};

export default ToolbarComponent;
