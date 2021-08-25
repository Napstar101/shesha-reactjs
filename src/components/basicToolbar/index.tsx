import React, { FC, ReactNode, Fragment } from 'react';
import ToolbarWrapper from '../toolbarWrapper';
import { Button } from 'antd';
import { nanoid } from 'nanoid';
import { IToolbarItem } from '../..';

interface IBasicToolbarProps {
  items: IToolbarItem[];
  extra?: ReactNode;
}

export const BasicToolbar: FC<IBasicToolbarProps> = ({ items, extra }) => (
  <ToolbarWrapper>
    <div className="toolbar-wrapper-left">
      <Fragment>
        {items.map(({ title, icon, onClick, hide, className, disabled }) =>
          !hide ? (
            <Button
              onClick={onClick}
              disabled={disabled}
              className={`toolbar-item ${disabled ? 'disabled' : ''} ${className || ''}`}
              key={nanoid()}
              type="link"
              icon={icon}
            >
              {title}
            </Button>
          ) : undefined
        )}
      </Fragment>
    </div>
    <div className="toolbar-wrapper-right">{extra}</div>
  </ToolbarWrapper>
);

export default BasicToolbar;
