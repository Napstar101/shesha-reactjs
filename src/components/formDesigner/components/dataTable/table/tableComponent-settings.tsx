import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { ITableComponentProps } from './models';
import { ColumnsEditorModal } from './columnsEditor/columnsEditorModal';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import SectionSeparator from '../../../../sectionSeparator';

export interface IProps {
  model: ITableComponentProps;
  onSave: (model: ITableComponentProps) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: ITableComponentProps) => void;
}

function ColumnsSettings(props: IProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const initialState = {
    items: props?.model?.items,
    useMultiselect: props?.model?.useMultiselect,
    crud: props?.model?.crud,
    overrideDefaultCrudBehavior: props?.model?.overrideDefaultCrudBehavior,
    editUrl: props?.model?.editUrl,
    deleteUrl: props?.model?.deleteUrl,
    updateUrl: props?.model?.updateUrl,
  };

  const onValuesChange = (changedValues, values) => {
    if (props.onValuesChange) props.onValuesChange(changedValues, values);
  };

  return (
    <Form form={form} onFinish={props.onSave} onValuesChange={onValuesChange} initialValues={initialState}>
      <Button onClick={() => setModalVisible(true)}>Customize Columns</Button>

      <Form.Item name="items">
        <ColumnsEditorModal
          visible={modalVisible}
          hideModal={() => {
            setModalVisible(false);
          }}
        />
      </Form.Item>

      <Form.Item
        name="useMultiselect"
        label="Use Multi-select"
        valuePropName="checked"
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
      >
        <Checkbox />
      </Form.Item>

      <SectionSeparator sectionName="Editing/CRUD" />

      <Form.Item
        name="crud"
        label="Allow editing/CRUD mode?"
        valuePropName="checked"
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        tooltip="Whether you should be able to perform CRUD functionalities on this table"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        name="overrideDefaultCrudBehavior"
        label="Override Default Crud Behavior?"
        valuePropName="checked"
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        tooltip="By default you get custom action columns as part of editing mode. To get full control, you can check this to rely on custom behavior you define"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item name="editUrl" label="Edit URL" wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
        <Input />
      </Form.Item>

      <Form.Item name="deleteUrl" label="Delete URL" wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
        <Input />
      </Form.Item>

      <Form.Item name="updateUrl" label="Update URL" wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
        <Input />
      </Form.Item>
    </Form>
  );
}

export default ColumnsSettings;
