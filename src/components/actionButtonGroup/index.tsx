import React, { FC, Fragment } from 'react';
import { nanoid } from 'nanoid';
import { Tooltip, Button } from 'antd';
import { v4 as uuid } from 'uuid';
import { IToolbarItem } from '../../interfaces';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export interface IActionButtonGroupProps {
  /** The items to display as buttons */
  items: IToolbarItem[];

  /** The class name */
  className?: string;

  /** The button size  */
  btnSize?: SizeType;
}

/**
 * A component to display action buttons.
 *
 * Can be rendered as toolbar items and extra buttons on the CollapsiblePanel
 */
export const ActionButtonGroup: FC<IActionButtonGroupProps> = ({ items, className, btnSize = 'small' }) => {
  return (
    <div className={`sha-action-btn-group ${className}`}>
      <div className="sha-index-toolbar-left">
        <Fragment>
          <Fragment>
            {items
              ?.filter(({ hide }) => !hide)
              ?.map(({ title, icon, onClick, className, disabled, tooltipName, render }) => {
                if (render && typeof render === 'function') {
                  return render();
                }

                return (
                  <Tooltip title={tooltipName} placement="right" key={nanoid()}>
                    <Button
                      onClick={event => {
                        event?.stopPropagation();
                        onClick(event);
                      }}
                      disabled={disabled}
                      className={`toolbar-item ${disabled ? 'disabled' : ''} ${className || ''}`}
                      key={uuid()}
                      type="link"
                      icon={icon}
                      size={btnSize}
                    >
                      {title}
                    </Button>
                  </Tooltip>
                )
              }
            )}
          </Fragment>
        </Fragment>
      </div>
    </div>
  );
};

export default ActionButtonGroup;
