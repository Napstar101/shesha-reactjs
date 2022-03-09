import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { ITableComponentBaseProps, ITableComponentProps } from './models';
import { ColumnsEditorModal } from './columnsEditor/columnsEditorModal';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import SectionSeparator from '../../../../sectionSeparator';

export interface IProps {
  model: ITableComponentProps;
  onSave: (model: ITableComponentProps) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: ITableComponentProps) => void;
}

interface IColumnsSettingsState {
  showColumnsModal?: boolean;
}

function ColumnsSettings(props: IProps) {
  const [state, setState] = useState<IColumnsSettingsState>({ showColumnsModal: false });
  const [form] = Form.useForm();

  const toggleColumnsModal = () => setState(prev => ({ ...prev, showColumnsModal: !prev?.showColumnsModal }));

  const initialState: ITableComponentBaseProps = {
    items: props?.model?.items,
    useMultiselect: props?.model?.useMultiselect,
    crud: props?.model?.crud,
    overrideDefaultCrudBehavior: props?.model?.overrideDefaultCrudBehavior,
  };

  const onValuesChange = (changedValues, values: ITableComponentBaseProps) => {
    if (props.onValuesChange) props.onValuesChange(changedValues, values as any);
  };

  return (
    <Form form={form} onFinish={props.onSave} onValuesChange={onValuesChange} initialValues={initialState}>
      <Button onClick={toggleColumnsModal}>Customize Columns</Button>

      <Form.Item name="items">
        <ColumnsEditorModal visible={state?.showColumnsModal} hideModal={toggleColumnsModal} />
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
    </Form>
  );
}

export default ColumnsSettings;
