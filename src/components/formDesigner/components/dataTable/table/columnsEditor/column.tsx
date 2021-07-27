import { FC } from 'react';
import { IColumnsProps } from '../../../../../../providers/datatableColumnsConfigurator/models';
import { Button, Tooltip } from 'antd';
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { useColumnsConfigurator } from '../../../../../../providers/datatableColumnsConfigurator';
import DragHandle from './dragHandle';
import React from 'react';
import ShaIcon, { IconType } from '../../../../../shaIcon';

export interface IProps extends IColumnsProps {
  index: number[];
}

export const Column: FC<IProps> = props => {
  const { deleteButton, selectedItemId } = useColumnsConfigurator();

  const onDeleteClick = () => {
    deleteButton(props.id);
  };

  let classes = ['sha-toolbar-item'];
  if (selectedItemId === props.id) classes.push('selected');

  return (
    <div className={classes.reduce((a, c) => a + ' ' + c)}>
      <div className="sha-toolbar-item-header">
        <DragHandle id={props.id}></DragHandle>
        { props.icon && <ShaIcon iconName={props.icon as IconType}/> }
        <span className="sha-toolbar-item-name">
          {props.name}
        </span>
        { props.tooltip && (
          <Tooltip title={props.tooltip}>
            <QuestionCircleOutlined className="sha-help-icon"/>
          </Tooltip>
        ) }
        <div className="sha-toolbar-item-controls">
          <Button icon={<DeleteFilled color="red" />} onClick={onDeleteClick} size="small" danger></Button>
        </div>
      </div>
    </div>
  );
};

export default Column;
