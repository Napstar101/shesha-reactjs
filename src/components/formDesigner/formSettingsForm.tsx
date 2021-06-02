import React, { useEffect } from 'react';
import { Form, FormInstance } from 'antd';
import { ConfigurableForm } from '../../components';
import { IConfigurableFormComponent } from '../../providers/form/models';

export interface IProps<TModel extends IConfigurableFormComponent> {
  model: TModel;
  markup: IConfigurableFormComponent[];
  onSave: (model: TModel) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: TModel) => void;
  form: FormInstance;
}

function Settings<TModel extends IConfigurableFormComponent>({
  onSave,
  model,
  markup,
  onValuesChange,
  form: providedForm,
}: IProps<TModel>) {
  const [form] = Form.useForm(providedForm);

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
