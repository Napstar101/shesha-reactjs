import React, { useEffect } from 'react';
import { Form } from 'antd';
import { ConfigurableForm } from '../../components';
import { IConfigurableFormComponent, FormMarkup } from '../../providers/form/models';

export interface IProps<TModel extends IConfigurableFormComponent> {
  model: TModel;
  markup: FormMarkup;
  onSave: (model: TModel) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: TModel) => void;
}

function Settings<TModel extends IConfigurableFormComponent>({
  onSave,
  model,
  markup,
  onValuesChange,
}: IProps<TModel>) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  });

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
    ></ConfigurableForm>
  );
}

export default Settings;
