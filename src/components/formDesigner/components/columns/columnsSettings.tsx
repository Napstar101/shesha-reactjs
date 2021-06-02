import { Form, Input, FormInstance } from 'antd';
import React from 'react';
import { IColumnsComponentProps } from './columns';
import ColumnsList from './columnsList';

export interface IProps {
  model: IColumnsComponentProps;
  onSave: (model: IColumnsComponentProps) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: IColumnsComponentProps) => void;
  form: FormInstance;
}

function ColumnsSettings({ onSave, model, onValuesChange, form: providedForm }: IProps) {
  const [form] = Form.useForm(providedForm);

  return (
    <Form form={form} onFinish={onSave} layout="vertical" onValuesChange={onValuesChange}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]} initialValue={model?.name}>
        <Input></Input>
      </Form.Item>
      <Form.Item name="label" label="Label" initialValue={model?.label}>
        <Input></Input>
      </Form.Item>
      <Form.Item name="columns" label="Columns" initialValue={model?.columns || []}>
        <ColumnsList></ColumnsList>
      </Form.Item>
    </Form>
  );
}

export default ColumnsSettings;
