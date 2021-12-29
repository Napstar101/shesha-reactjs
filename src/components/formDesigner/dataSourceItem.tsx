import React, { FC } from 'react';
import { IPropertyMetadata } from '../../interfaces/metadata';
import { getIconByDataType } from '../../utils/metadata';
import ShaIcon from '../shaIcon';

export interface IProps {
  item: IPropertyMetadata;
  index: number;
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
