import React, { FC, useEffect } from 'react';
import { Form, Spin } from 'antd';
import ComponentsContainer from '../formDesigner/componentsContainer';
import { ROOT_COMPONENT_KEY } from '../../providers/form/models';
import { useForm } from '../../providers/form';
import { IConfigurableFormRendererProps } from './models';
import { useMutate } from 'restful-react';
import { ValidateErrorEntity } from '../../interfaces';
import { addFormFieldsList } from '../../utils/form';
import { removeZeroWidthCharsFromString } from '../..';

export const ConfigurableFormRenderer: FC<IConfigurableFormRendererProps> = ({
  children,
  skipPostOnFinish,
  form,
  httpVerb = 'POST',
  ...props
}) => {
  const { setFormData, formData, allComponents, formMode, isDragging, formSettings, setValidationErrors } = useForm();

  const onFieldsChange = (changedFields: any[], allFields: any[]) => {
    if (props.onFieldsChange) props.onFieldsChange(changedFields, allFields);

    // custom handling here...
  };

  const onValuesChangeInternal = (changedValues: any, values: any) => {
    if (props.onValuesChange) props.onValuesChange(changedValues, values);

    // recalculate components visibility
    setFormData({ values, mergeValues: true });

    // update validation rules
  };

  // reset form to initial data on any change of components or initialData
  useEffect(() => {
    setFormData({ values: props.initialValues, mergeValues: true });
    if (form) {
      form.resetFields();
    }
  }, [allComponents, props.initialValues]);

  /**
   * This function return the submit url.
   *
   * @returns
   */
  const getSubmitPath = () => {
    const { postUrl, putUrl, deleteUrl } = formSettings;

    let url = postUrl;

    if (httpVerb === 'POST' && postUrl) {
      url = postUrl;
    }

    if (httpVerb === 'PUT' && putUrl) {
      url = putUrl;
    }

    if (httpVerb === 'DELETE' && deleteUrl) {
      url = deleteUrl;
    }

    return removeZeroWidthCharsFromString(url);
  };

  const { mutate: doSubmit, loading: submitting } = useMutate({
    verb: httpVerb || 'POST', // todo: convert to configurable
    path: getSubmitPath(),
  });

  const onFinish = () => {
    const postData = addFormFieldsList({ ...formData }, form);

    if (skipPostOnFinish) {
      if (props?.onFinish) {
        props?.onFinish(postData);
      }

      return;
    }

    if (formSettings.postUrl) {
      setValidationErrors(null);
      doSubmit(postData)
        .then(() => {
          // note: we pass merged values
          if (props.onFinish) props.onFinish(postData);
        })
        .catch(e => {
          setValidationErrors(e?.data?.error || e);
          console.log('ConfigurableFormRenderer onFinish e: ', e);
        }); // todo: test and show server-side validation
    } // note: we pass merged values
    else if (props.onFinish) props.onFinish(postData);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    setValidationErrors(null);
    if (props.onFinishFailed) props.onFinishFailed(errorInfo);
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
        size={props.size}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChangeInternal}
        onFieldsChange={onFieldsChange}
        fields={props.fields}
        initialValues={props.initialValues}
        className={`sha-form sha-form-${formMode} ${isDragging ? 'sha-dragging' : ''}`}
        {...mergedProps}
      >
        <ComponentsContainer containerId={ROOT_COMPONENT_KEY} />
        {children}
      </Form>
    </Spin>
  );
};

export default ConfigurableFormRenderer;
