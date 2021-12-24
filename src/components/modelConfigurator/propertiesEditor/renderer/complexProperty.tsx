import { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { usePropertiesEditor } from '../provider';
import DragHandle from './dragHandle';
import React from 'react';
// import ShaIcon, { IconType } from '../../shaIcon';
import { IModelItem } from '../../../../interfaces/modelConfigurator';
import ItemsContainer from './itemsContainer';

export interface IProps extends IModelItem {
  index: number[];
}

export const ComplexProperty: FC<IProps> = props => {
  const { deleteItem, selectedItemId, selectedItemRef } = usePropertiesEditor();

  const onDeleteClick = () => {
    deleteItem(props.id);
  };

  let classes = ['sha-sidebar-item'];
  if (selectedItemId === props.id) {
    classes.push('selected');
  }

  return (
    <div className={classes.reduce((a, c) => a + ' ' + c)} ref={selectedItemId === props.id ? selectedItemRef : undefined}>
      <div className="sha-sidebar-item-header">
        <DragHandle id={props.id}></DragHandle>
        {/* {props.icon && <ShaIcon iconName={props.icon as IconType} />} */}
        <span className="sha-sidebar-item-name">{props.name}</span>
        {props.label && (
          <Tooltip title={props.label}>
            <QuestionCircleOutlined className="sha-help-icon" />
          </Tooltip>
        )}
        <div className="sha-sidebar-item-controls">
          <Button icon={<DeleteFilled color="red" />} onClick={onDeleteClick} size="small" danger></Button>
        </div>
        <div className="sha-sidebar-group-container">
          <ItemsContainer index={props.index} items={props.properties || []} />
        </div>
        {/* { props.childItems && props.childItems.map((item, index) => {
          return <ModelItem {...item} key={index} index={[ ...props.index, index ]} />
        }) } */}
      </div>
    </div>
  );
};

export default ComplexProperty;
