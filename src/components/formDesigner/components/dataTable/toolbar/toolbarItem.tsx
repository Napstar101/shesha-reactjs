import { FC } from 'react';
import { IToolbarButton } from '../../../../../providers/toolbarConfigurator/models';
import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { useToolbarConfigurator } from '../../../../../providers/toolbarConfigurator';
import DragHandle from './dragHandle';
import React from 'react';

export interface IProps extends IToolbarButton {
  index: number[];
}

export const ToolbarItem: FC<IProps> = props => {
  const { deleteButton, selectedItemId } = useToolbarConfigurator();

  const onDeleteClick = () => {
    deleteButton(props.id);
  };

  let classes = ['sha-toolbar-item'];
  if (selectedItemId === props.id) classes.push('selected');

  return (
    <div className={classes.reduce((a, c) => a + ' ' + c)}>
      <div className="sha-toolbar-item-header">
        <DragHandle id={props.id}></DragHandle>
        {props.name}
        <div className="sha-toolbar-item-controls">
          <Button icon={<DeleteFilled color="red" />} onClick={onDeleteClick} size="small" danger></Button>
        </div>
      </div>
    </div>
  );
};

export default ToolbarItem;
