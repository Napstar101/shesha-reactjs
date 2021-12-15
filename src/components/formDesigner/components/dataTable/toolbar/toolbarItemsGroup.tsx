import React, { FC } from 'react';
import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { IButtonGroup } from '../../../../../providers/toolbarConfigurator/models';
import { useToolbarConfigurator } from '../../../../../providers/toolbarConfigurator';
import ToolbarItemsContainer from './toolbarItemsContainer';
import DragHandle from './dragHandle';

export interface IProps extends IButtonGroup {
  index: number[];
}

export const ToolbarItemsGroup: FC<IProps> = props => {
  const { deleteGroup, selectedItemId } = useToolbarConfigurator();

  const onDeleteClick = () => {
    deleteGroup(props.id);
  };

  let classes = ['sha-toolbar-item'];
  if (selectedItemId === props.id) classes.push('selected');

  return (
    <div className={classes.reduce((a, c) => a + ' ' + c)}>
      <div className="sha-toolbar-group-header">
        <DragHandle id={props.id}></DragHandle>
        <strong>{props.name}</strong>
        <div className="sha-toolbar-item-controls">
          <Button icon={<DeleteFilled color="red" />} onClick={onDeleteClick} size="small" danger></Button>
        </div>
      </div>
      <div className="sha-toolbar-group-container">
        <ToolbarItemsContainer index={props.index} items={props.childItems || []}></ToolbarItemsContainer>
      </div>
    </div>
  );
};

export default ToolbarItemsGroup;