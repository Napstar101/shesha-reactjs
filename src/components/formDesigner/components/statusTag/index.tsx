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

    const allEmpty = !model?.override && !model?.value && !model?.color;

    const getValueByExpression = (expression: string = '') => {
      return expression?.includes('{{') ? evaluateString(expression, formData) : expression;
    };

    if (allEmpty) {
      return <Alert type="info" message="Status tag not configured properly" />;
    }

    const evaluatedOverride = getValueByExpression(model?.override);
    const evaluatedValue = getValueByExpression(model?.value as string);
    const evaluatedColor = getValueByExpression(model?.color);

    const computedColor = getExpressionExecutor(model?.colorCodeEvaluator) || '';

    const allEvaluationEmpty = [evaluatedOverride, evaluatedValue, evaluatedColor].filter(Boolean)?.length === 0;

    const getParsedMappings = () => {
      try {
        return JSON.parse(model?.mappings);
      } catch (error) {
        return null;
      }
    };

    const props: ITagProps = {
      override: evaluatedOverride,
      value: allEvaluationEmpty ? 1000 : evaluatedValue,
      color: computedColor || evaluatedColor,
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
