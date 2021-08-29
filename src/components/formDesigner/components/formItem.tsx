import React, { FC } from 'react';
import { IConfigurableFormComponent } from '../../../providers/form/models';
import { Form } from 'antd';
import { useForm } from '../../../providers/form';
import { getFieldNameFromExpression, getValidationRules } from '../../../providers/form/utils';
import './styles.less';

export interface IProps {
  model: IConfigurableFormComponent;
  readonly children?: React.ReactNode;
  valuePropName?: string;
  initialValue?: any;
  /** Custom visibility code
   * available variables:
   * value - value of the current component
   * data - entire form data
   * moment - instance of the moment.js
   */
  customVisibility?: string;
}

const FormItem: FC<IProps> = ({ children, model, valuePropName, initialValue }) => {
  const { formMode, visibleComponentIds } = useForm();

  const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
  const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);

  return (
    <Form.Item
      className={`${model.hideLabel ? 'form-item-hidden' : ''}`}
      name={getFieldNameFromExpression(model.name)}
      label={model.hideLabel ? null : model.label}
      labelAlign={model.labelAlign}
      hidden={isHidden}
      valuePropName={valuePropName}
      // initialValue={initialValue}
      initialValue={model.defaultValue || initialValue}
      tooltip={model.description}
      rules={isHidden ? [] : getValidationRules(model)}
    >
      {children}
    </Form.Item>
  );
};

export default FormItem;
