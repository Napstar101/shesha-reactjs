import { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { DeleteFilled, LockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useModelConfigurator } from '../../../providers';
import DragHandle from './dragHandle';
import React from 'react';
//import ShaIcon, { IconType } from '../../shaIcon';
import classNames from 'classnames';
import { IModelItem } from '../../../interfaces/modelConfigurator';
import { MetadataSourceType } from '../../../interfaces/metadata';

export interface IProps extends IModelItem {
  index: number[];
}

export const ModelItem: FC<IProps> = props => {
  const { deleteItem, selectedItemId } = useModelConfigurator();

  const onDeleteClick = () => {
    deleteItem(props.id);
  };

  /*
  const { icon } = props;

  const renderedIcon = icon ? (
    typeof icon === 'string' ? (
      <ShaIcon iconName={icon as IconType}></ShaIcon>
    ) : React.isValidElement(icon) ? (
      icon
    ) : null
  ) : null;
*/
  return (
    <div className={classNames('sha-sidebar-item', { selected: selectedItemId === props.id })}>
      <div className="sha-sidebar-item-header">
        <DragHandle id={props.id} />
        {/* {renderedIcon} */}
        
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

export default ModelItem;
