import { useState } from 'react';
import { Form, Button, FormInstance } from 'antd';
import { ITableProps } from './models';
import { ColumnsEditorModal } from './columnsEditor/columnsEditorModal';
import React from 'react';

export interface IProps {
  model: ITableProps;
  onSave: (model: ITableProps) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: ITableProps) => void;
  form: FormInstance;
}

function ColumnsSettings(props: IProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm(props.form);

  const onValuesChange = (changedValues, values) => {
    if (props.onValuesChange) props.onValuesChange(changedValues, values);
  };

  return (
    <>
      <Form form={form} onFinish={props.onSave} onValuesChange={onValuesChange}>
        <Button onClick={() => setModalVisible(true)}>Customise Columns</Button>
        <Form.Item name="items" initialValue={props.model.items}>
          <ColumnsEditorModal
            visible={modalVisible}
            hideModal={() => {
              setModalVisible(false);
            }}
          ></ColumnsEditorModal>
        </Form.Item>
      </Form>
    </>
  );
}

export default ColumnsSettings;
