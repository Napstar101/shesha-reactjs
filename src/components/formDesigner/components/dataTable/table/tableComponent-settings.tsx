import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { ITableComponentProps } from './models';
import { ColumnsEditorModal } from './columnsEditor/columnsEditorModal';
import Checkbox from 'antd/lib/checkbox/Checkbox';

export interface IProps {
  model: ITableComponentProps;
  onSave: (model: ITableComponentProps) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: ITableComponentProps) => void;
}

function ColumnsSettings(props: IProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onValuesChange = (changedValues, values) => {
    if (props.onValuesChange) props.onValuesChange(changedValues, values);
  };

  return (
    <>
      <Form form={form} onFinish={props.onSave} onValuesChange={onValuesChange}>
        <Button onClick={() => setModalVisible(true)}>Customize Columns</Button>

        <Form.Item name="items" initialValue={props.model.items}>
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
          <Checkbox defaultChecked={props?.model?.useMultiselect} />
        </Form.Item>
      </Form>
    </>
  );
}

export default ColumnsSettings;
