import { ArrowsAltOutlined } from '@ant-design/icons';
import React from 'react';
import { evaluateString, validateConfigurableComponentSettings } from '../../../../formDesignerUtils';
import { IConfigurableFormComponent, IToolboxComponent } from '../../../../interfaces/formDesigner';
import { useForm } from '../../../../providers/form';
import { FormMarkup } from '../../../../providers/form/models';
import StatusTag, { DEFAULT_STATUS_TAG_MAPPINGS, IStatusTagProps as ITagProps } from '../../../statusTag';
import settingsFormJson from './settingsForm.json';

export interface IStatusTagProps extends ITagProps, IConfigurableFormComponent {
  colorCodeEvaluator?: string;
}

const settingsForm = settingsFormJson as FormMarkup;

const StatusTagComponent: IToolboxComponent<IStatusTagProps> = {
  type: 'statusTag',
  name: 'Status Tag',
  icon: <ArrowsAltOutlined />,
  factory: (model: IStatusTagProps) => {
    const { formData } = useForm();

    const getExpressionExecutor = (expression: string) => {
      if (!expression) {
        console.error('Expected expression to be defined but it was found to be empty.');

        return;
      }

      // tslint:disable-next-line:function-constructor
      const func = new Function('data', expression);

      return func(formData);
    };
    const props: ITagProps = {
      override: evaluateString(model?.override, formData),
      value: evaluateString(model?.value as string, formData),
      color: evaluateString(model?.color, formData) || getExpressionExecutor(model?.colorCodeEvaluator),
      mappings: getExpressionExecutor(model?.mappings as string),
    };

    return <StatusTag {...props} />;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => ({
    mappings: DEFAULT_STATUS_TAG_MAPPINGS,
    ...model,
  }),
};

export default StatusTagComponent;
