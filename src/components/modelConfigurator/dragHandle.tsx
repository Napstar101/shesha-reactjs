import React, { FC } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { useModelConfigurator } from '../../providers/modelConfigurator';

export interface IDragHandleProps {
  id: string;
}

export const DragHandle: FC<IDragHandleProps> = ({ id }) => {
  const { selectItem } = useModelConfigurator();
  return (
    <div className="sha-sidebar-item-drag-handle" onClick={() => selectItem(id)}>
      <MoreOutlined />
    </div>
  );
};

export default DragHandle;
