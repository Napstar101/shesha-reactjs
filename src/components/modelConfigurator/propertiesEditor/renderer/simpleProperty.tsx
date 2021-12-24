import { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { DeleteFilled, LockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { usePropertiesEditor } from '../provider';
import DragHandle from './dragHandle';
import React from 'react';
import classNames from 'classnames';
import { IModelItem } from '../../../../interfaces/modelConfigurator';
import { MetadataSourceType } from '../../../../interfaces/metadata';

export interface IProps extends IModelItem {
  index: number[];
}

export const SimpleProperty: FC<IProps> = props => {
  const { deleteItem, selectedItemId, selectedItemRef } = usePropertiesEditor();

  const onDeleteClick = () => {
    deleteItem(props.id);
  };

  return (
    <div className={classNames('sha-sidebar-item', { selected: selectedItemId === props.id })} ref={selectedItemId === props.id ? selectedItemRef : undefined}>
      <div className="sha-sidebar-item-header">
        <DragHandle id={props.id} />
        
        { props.source === MetadataSourceType.ApplicationCode && ( <LockOutlined /> ) }
        
        <span className="sha-sidebar-item-name">{props.name}</span>

        {props.label && (
          <Tooltip title={props.label}>
            <QuestionCircleOutlined className="sha-help-icon" />
          </Tooltip>
        )}
        <div className="sha-sidebar-item-controls">
          <Button icon={<DeleteFilled color="red" />} onClick={onDeleteClick} size="small" danger></Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleProperty;
