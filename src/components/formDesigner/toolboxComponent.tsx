import React, { FC } from 'react';
import { IToolboxComponent } from '../../interfaces';

export interface IProps {
  component: IToolboxComponent;
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
