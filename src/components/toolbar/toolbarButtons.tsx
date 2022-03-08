import React, { FC, Fragment, ReactNode } from 'react';
import { Tooltip, Button } from 'antd';
import { evaluateValue, joinStringValues, ShaIcon, useForm, useShaRouting } from '../..';
import { nanoid } from 'nanoid/non-secure';
import classNames from 'classnames';
import { IconType } from '../shaIcon';
import ConditionalWrap from '../conditionalWrapper';
import moment from 'moment';
import { evaluateExpression } from '../../providers/form/utils';
import { IToolbarButtonItem, IToolbarProps } from './models';

/**
 * A component to display action buttons.
 *
 * Can be rendered as toolbar items and extra buttons on the CollapsiblePanel
 */
export const ToolbarButtonGroup: FC<IToolbarProps> = ({ items, className, btnSize = 'small', formId }) => {
  const formState = useForm();
  const { router } = useShaRouting();

  const { formData, form, getAction, formMode } = formState;

  const renderIcon = (icon: string | ReactNode) =>
    typeof icon === 'string' ? <ShaIcon iconName={icon as IconType} /> : icon;

  const getExpressionExecutor = (expression: string) => {
    if (!expression) {
      console.error('Expected expression to be defined but it was found to be empty.');

      return;
    }

    // tslint:disable-next-line:function-constructor
    const func = new Function('data', 'moment', 'form', 'formMode', expression);

    return func(formData, moment, form, formMode);
  };

  const getCustomEnabled = (expression: string) => {
    if (expression) {
      const executed = getExpressionExecutor(expression);

      return typeof executed === 'boolean' ? executed : true;
    }

    return true;
  };

  const getCustomVisible = (expression: string) => {
    if (expression) {
      const executed = getExpressionExecutor(expression);

      return typeof executed === 'boolean' ? executed : true;
    }

    return true;
  };

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, item: IToolbarButtonItem) => {
    event.stopPropagation();

    const { actionScript, targetUrl, formAction, customActionParameters } = item;

    function executeExpression() {
      if (actionScript) {
        getExpressionExecutor(actionScript);
      }

      return;
    }

    switch (item.buttonAction) {
      case 'submit': {
        form?.submit();
        return;
      }
      case 'reset': {
        form?.resetFields();
        return;
      }
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

        if (targetUrl) {
          router?.push(evaluatedUrl);
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
                const {
                  title,
                  icon,
                  className: localClassName,
                  disabled,
                  tooltipName,
                  render,
                  name,
                  id,
                  customEnabled,
                  customVisibility,
                } = item;

                if (render && typeof render === 'function') {
                  return render();
                }

                if (!getCustomVisible(customVisibility)) {
                  return null;
                }

                return (
                  <ConditionalWrap
                    key={id}
                    wrap={content => (
                      <Tooltip title={tooltipName} placement="right" key={nanoid()}>
                        {content}
                      </Tooltip>
                    )}
                    condition={!!tooltipName}
                  >
                    <Button
                      onClick={event => handleClick(event, item)}
                      disabled={!getCustomEnabled(customEnabled)}
                      // disabled={disabled}
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
              })}
          </Fragment>
        </Fragment>
      </div>
    </div>
  );
};

export default ToolbarButtonGroup;
