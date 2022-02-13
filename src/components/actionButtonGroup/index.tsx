import React, { FC, Fragment, ReactNode } from 'react';
import { Tooltip, Button } from 'antd';
import { IToolbarItem } from '../../interfaces';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { joinStringValues, ShaIcon, useForm } from '../..';
import { nanoid } from 'nanoid/non-secure';
import classNames from 'classnames';
import { IconType } from '../shaIcon';

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
  const { formData } = useForm();

  const renderIcon = (icon: string | ReactNode) =>
    typeof icon === 'string' ? <ShaIcon iconName={icon as IconType} /> : icon;

  return (
    <div className={joinStringValues(['sha-action-btn-group', className])}>
      <div className="sha-index-toolbar-left">
        <Fragment>
          <Fragment>
            {items
              ?.filter(({ hide }) => !hide)
              ?.map(({ title, icon, onClick, className: localClassName, disabled, tooltipName, render }) => {
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
                      className={classNames('toolbar-item', localClassName, { disabled })}
                      key={nanoid()}
                      type="link"
                      icon={renderIcon(icon)}
                      size={btnSize}
                    >
                      {title}
                    </Button>
                  </Tooltip>
                );
              })}
          </Fragment>
        </Fragment>
      </div>
    </div>
  );
};

export default ActionButtonGroup;
