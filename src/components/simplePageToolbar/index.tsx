import React, { FC, Fragment } from 'react';
import { nanoid } from 'nanoid';
import { IToolbarItem } from '../../';
import NodeOrFuncRenderer, { ReactNodeOrFunc } from '../nodeOrFuncRenderer';
import { Tooltip, Button } from 'antd';
import { v4 as uuid } from 'uuid';

export interface IIndexToolbarProps {
  items: IToolbarItem[];
  elementsRight?: ReactNodeOrFunc;
}

export const SimplePageToolbar: FC<IIndexToolbarProps> = ({ items, elementsRight }) => {
  return (
    <div className="sha-simple-page-toolbar">
      <div className="sha-simple-page-toolbar-left">
        <Fragment>
          <Fragment>
            {items.map(({ title, icon, onClick, hide, className, disabled, tooltipName }) =>
              !hide ? (
                <Tooltip title={tooltipName} placement="right">
                  <Button
                    onClick={onClick}
                    disabled={disabled}
                    className={`toolbar-item ${disabled ? 'disabled' : ''} ${className || ''}`}
                    key={uuid()}
                    type="link"
                    icon={icon}
                  >
                    {title}
                  </Button>
                </Tooltip>
              ) : (
                undefined
              )
            )}
          </Fragment>
        </Fragment>
      </div>

      <div className="sha-simple-page-toolbar-right">
        {Array.isArray(elementsRight) ? (
          elementsRight?.map(element => <span key={nanoid()}>{element}</span>)
        ) : (
          <NodeOrFuncRenderer>{elementsRight}</NodeOrFuncRenderer>
        )}
      </div>
    </div>
  );
};

export default SimplePageToolbar;
