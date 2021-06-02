import React, { FC } from 'react';
import { IToolboxComponentBase } from '../../interfaces';
import styled from 'styled-components';

export interface IProps {
  component: IToolboxComponentBase;
  index: number;
}

const Item = styled.div`
  border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;

const ToolbarComponent: FC<IProps> = ({ component /*, index*/ }) => {
  const ComponentContent = () => (
    <div>
      {component.icon}
      <span>{component.name}</span>
    </div>
  );

  return (
    <Item className="sha-toolbox-component">
      <ComponentContent />
    </Item>
  );
};

export default ToolbarComponent;
