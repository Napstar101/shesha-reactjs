import React, { FC } from 'react';
//import styled from 'styled-components';
import { IPropertyMetadata } from '../../providers/metadata/models';
import ShaIcon, { IconType } from '../shaIcon';

export interface IProps {
  item: IPropertyMetadata;
  index: number;
}

/*
const Item = styled.div`
  border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;
*/

const getIconByDataType = (dataType: number):IconType => {
  switch(dataType) {
    case 1: return 'FieldStringOutlined';
    case 2: return 'FieldNumberOutlined';
    default: return null;
  }
}

const DataSourceItem: FC<IProps> = ({ item /*, index*/ }) => {
  const icon = getIconByDataType(item.dataType);
  const ComponentContent = () => (
    <div>
      {icon && <ShaIcon iconName={icon}></ShaIcon>}
      <span>{item.label}</span>
    </div>
  );

  return (
    <div className="sha-toolbox-component">
      <ComponentContent />
    </div>
  );
};

export default DataSourceItem;
