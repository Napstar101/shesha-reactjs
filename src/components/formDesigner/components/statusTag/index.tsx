import { ArrowsAltOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import { evaluateString, validateConfigurableComponentSettings } from '../../../../formDesignerUtils';
import { IConfigurableFormComponent, IToolboxComponent } from '../../../../interfaces/formDesigner';
import { useForm } from '../../../../providers/form';
import { FormMarkup } from '../../../../providers/form/models';
import StatusTag, { DEFAULT_STATUS_TAG_MAPPINGS, IStatusTagProps as ITagProps } from '../../../statusTag';
import settingsFormJson from './settingsForm.json';

export interface IStatusTagProps extends Omit<ITagProps, 'mappings'>, IConfigurableFormComponent {
  colorCodeEvaluator?: string;
  overrideCodeEvaluator?: string;
  valueCodeEvaluator?: string;
  mappings?: string;
}

const settingsForm = settingsFormJson as FormMarkup;

const StatusTagComponent: IToolboxComponent<IStatusTagProps> = {
  type: 'statusTag',
  name: 'Status Tag',
  icon: <ArrowsAltOutlined />,
  factory: (model: IStatusTagProps) => {
    const { formData, formMode } = useForm();

    const getExpressionExecutor = (expression: string) => {
      if (!expression) {
        return null;
      }

      // tslint:disable-next-line:function-constructor
      const func = new Function('data', 'formMode', expression);

      return func(formData, formMode);
    };

    const { colorCodeEvaluator, overrideCodeEvaluator, valueCodeEvaluator, override, value, color } = model;

    const allEmpty =
      [colorCodeEvaluator, overrideCodeEvaluator, valueCodeEvaluator, override, value, color].filter(Boolean)
        ?.length === 0;

    console.log('StatusTagComponent :>> ', {
      colorCodeEvaluator,
      overrideCodeEvaluator,
      valueCodeEvaluator,
      override,
      value,
      color,
    });

    const getValueByExpression = (expression: string = '') => {
      return expression?.includes('{{') ? evaluateString(expression, formData) : expression;
    };

    if (allEmpty) {
      return <Alert type="info" message="Status tag not configured properly" />;
    }

    const evaluatedOverrideByExpression = getValueByExpression(override);
    const localValueByExpression = getValueByExpression(value as string);
    const localColorByExpression = getValueByExpression(color);

    const computedColorByCode = getExpressionExecutor(colorCodeEvaluator) || '';
    const computedOverrideByCode = getExpressionExecutor(overrideCodeEvaluator) || '';
    const computedValueByCode = getExpressionExecutor(valueCodeEvaluator) || '';

    // const allEvaluationEmpty = [evaluatedOverride, evaluatedValue, evaluatedColor].filter(Boolean)?.length === 0;

    const allEvaluationEmpty =
      [evaluatedOverrideByExpression, localValueByExpression, localColorByExpression].filter(Boolean)?.length === 0;

    const getParsedMappings = () => {
      try {
        return JSON.parse(model?.mappings);
      } catch (error) {
        return null;
      }
    };

    const props: ITagProps = {
      override: computedOverrideByCode || evaluatedOverrideByExpression,
      // value: computedValue || localValueByExpression,
      value: allEvaluationEmpty ? 1000 : computedValueByCode || localValueByExpression,
      color: computedColorByCode || localColorByExpression,
      mappings: getParsedMappings(),
    };

    return <StatusTag {...props} />;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => ({
    mappings: JSON.stringify(DEFAULT_STATUS_TAG_MAPPINGS, null, 2) as any,
    ...model,
  }),
};

export default StatusTagComponent;
