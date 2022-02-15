import React, { FC, Fragment, ReactNode } from 'react';
import { Tooltip, Button } from 'antd';
import { IToolbarItem } from '../../interfaces';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { evaluateValue, joinStringValues, ShaIcon, useForm, useShaRouting } from '../..';
import { nanoid } from 'nanoid/non-secure';
import classNames from 'classnames';
import { IconType } from '../shaIcon';
import ConditionalWrap from '../conditionalWrapper';
import moment from 'moment';
import { evaluateExpression } from '../../providers/form/utils';

export interface IActionButtonGroupProps {
  /** The items to display as buttons */
  items: IToolbarItem[];

  /** The class name */
  className?: string;

  /** The form id */
  formId?: string;

  /** The button size  */
  btnSize?: SizeType;
}

/**
 * A component to display action buttons.
 *
 * Can be rendered as toolbar items and extra buttons on the CollapsiblePanel
 */
export const ActionButtonGroup: FC<IActionButtonGroupProps> = ({ items, className, btnSize = 'small', formId }) => {
  const formState = useForm();
  const { router } = useShaRouting();

  const { formData, form, getAction, setFormData } = formState;

  console.log('ActionButtonGroup formState :>> ', formState);

  const renderIcon = (icon: string | ReactNode) =>
    typeof icon === 'string' ? <ShaIcon iconName={icon as IconType} /> : icon;

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, item: IToolbarItem) => {
    event.stopPropagation();

    const { actionScript, targetUrl, formAction, customActionParameters } = item;

    function executeExpression() {
      console.log('formData, moment, setFormData :>> ', formData, moment, setFormData);

      if (!actionScript) {
        console.error(
          'Expected actionScript to be defined but it was found to be empty. Please make sure that you specify it if the toolbar button mode is executeScript'
        );

        return;
      }
      // tslint:disable-next-line:function-constructor
      const func = new Function('data', 'moment', 'form', actionScript);

      const executedFunc = func(formData, moment, form);

      console.log('executedFunc :>> ', executedFunc);

      return func(formData, moment, setFormData);
    }

    switch (item.buttonAction) {
      case 'dialogue': {
        return;
      }
      case 'executeFormAction': {
        const action = formAction ? getAction(formId, formAction) : null;

        if (action) {
          const actionArgs = {};

          for (const parameterIdx in customActionParameters) {
            if (parameterIdx) {
              const parameter = customActionParameters[parameterIdx];

              const value = evaluateValue(parameter?.value, { data: formData });

              if (value) {
                actionArgs[parameter?.key] = value;
              }
            }
          }

          action(formData, actionArgs);
        }
        return;
      }
      case 'executeScript': {
        executeExpression();
        return;
      }
      case 'navigate': {
        const evaluatedUrl = evaluateExpression(targetUrl, formData);
        console.log('targetUrl, evaluatedUrl :>> ', targetUrl, evaluatedUrl);
        if (targetUrl) {
          router?.push(targetUrl);
        }
        return;
      }

      default:
        break;
    }
  };

  return (
    <div className={joinStringValues(['sha-action-btn-group', className])}>
      <div className="sha-index-toolbar-left">
        <Fragment>
          <Fragment>
            {items
              ?.filter(({ hide }) => !hide)
              ?.map(item => {
                const { title, icon, className: localClassName, disabled, tooltipName, render, name } = item;

                if (render && typeof render === 'function') {
                  return render();
                }

                if (items) {
                  return (
                    <ConditionalWrap
                      wrap={content => (
                        <Tooltip title={tooltipName} placement="right" key={nanoid()}>
                          {content}
                        </Tooltip>
                      )}
                      condition={!!tooltipName}
                    >
                      <Button
                        onClick={event => handleClick(event, item)}
                        disabled={disabled}
                        className={classNames('toolbar-item', localClassName, { disabled })}
                        key={nanoid()}
                        type="link"
                        icon={renderIcon(icon)}
                        size={btnSize}
                      >
                        {title || name}
                      </Button>
                    </ConditionalWrap>
                  );
                }
              })}
          </Fragment>
        </Fragment>
      </div>
    </div>
  );
};

export default ActionButtonGroup;
