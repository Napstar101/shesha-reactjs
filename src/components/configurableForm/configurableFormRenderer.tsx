import React, { FC, useEffect } from 'react';
import { Form, Spin } from 'antd';
import ComponentsContainer from '../formDesigner/componentsContainer';
import { ROOT_COMPONENT_KEY } from '../../providers/form/models';
import { useForm } from '../../providers/form';
import { IConfigurableFormRendererProps } from './models';
import { useMutate } from 'restful-react';

export const ConfigurableFormRenderer: FC<IConfigurableFormRendererProps> = ({ children, form, ...props }) => {
  const { setFormData, formData, allComponents } = useForm();

  const onFieldsChange = (changedFields: any[], allFields: any[]) => {
    if (props.onFieldsChange) props.onFieldsChange(changedFields, allFields);

    // custom handling here...
  };

  const onValuesChange = (changedValues: any, values: any) => {
    if (props.onValuesChange) props.onValuesChange(changedValues, values);

    // recalculate components visibility
    setFormData({ values: values, mergeValues: true });

    // update validation rules
  };

  // reset form to initial data on any change of components or initialData
  useEffect(() => {
    setFormData({ values: props.initialValues, mergeValues: true });
    if (form) {
      form.resetFields();
    }
  }, [allComponents, props.initialValues]);

  const { formMode, isDragging, formSettings } = useForm();
  const { mutate: doSubmit, loading: submitting } = useMutate({
    verb: 'POST', // todo: convert to configurable
    path: formSettings.postUrl,
  });

  const onFinish = () => {
    if (formSettings.postUrl) {
      doSubmit(formData)
        .then(() => {
          // note: we pass merged values
          if (props.onFinish) props.onFinish(formData);
        })
        .catch(e => console.log(e)); // todo: test and show server-side validation
    } // note: we pass merged values
    else if (props.onFinish) props.onFinish(formData);
  };

  const mergedProps = {
    layout: props.layout ?? formSettings.layout,
    labelCol: props.labelCol ?? formSettings.labelCol,
    wrapperCol: props.wrapperCol ?? formSettings.wrapperCol,
    colon: formSettings.colon,
  };

  return (
    <Spin spinning={submitting}>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={props.onFinishFailed}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
        initialValues={props.initialValues}
        className={`sha-form sha-form-${formMode} ${isDragging ? 'sha-dragging' : ''}`}
        {...mergedProps}
      >
        <ComponentsContainer containerId={ROOT_COMPONENT_KEY}></ComponentsContainer>
        {children}
      </Form>
    </Spin>
  );
};

export default ConfigurableFormRenderer;
