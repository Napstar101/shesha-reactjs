import React, { useEffect } from 'react';
import { Form } from 'antd';
import { ConfigurableForm } from '../../components';
import { IConfigurableFormComponent, FormMarkup } from '../../providers/form/models';
import { IPropertyMetadata } from '../../providers/metadata/models';
import { IToolboxComponent } from '../../interfaces';

export interface IProps<TModel extends IConfigurableFormComponent> {
  model: TModel;
  markup: FormMarkup;
  onSave: (model: TModel) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: TModel) => void;
  toolboxComponent: IToolboxComponent;
}

function Settings<TModel extends IConfigurableFormComponent>({
  onSave,
  model,
  markup,
  onValuesChange,
  toolboxComponent,
}: IProps<TModel>) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  });

  const linkToModelMetadata = (metadata: IPropertyMetadata) => {
    const currentModel = form.getFieldsValue() as TModel;

    const wrapper = toolboxComponent.linkToModelMetadata
      ? m => toolboxComponent.linkToModelMetadata(m, metadata)
      : m => m;

    const newModel: TModel = wrapper({
      ...currentModel,
      label: metadata.label,
      description: metadata.description,
    });

    form.setFieldsValue(newModel);
  }

  return (
    <ConfigurableForm
      layout="vertical"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      mode="edit"
      form={form}
      onFinish={onSave}
      markup={markup}
      initialValues={model}
      onValuesChange={onValuesChange}
      actions={{
        linkToModelMetadata: linkToModelMetadata
      }}
    ></ConfigurableForm>
  );
}

export default Settings;
