import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { SectionSeparator } from '../../../..';
import { IChildTableSettingsProps } from './models';
import { ToolbarSettingsModal } from '../../dataTable/toolbar/toolbarSettingsModal';

export interface IChildDataTableSettingsProps {
  model: IChildTableSettingsProps;
  onSave: (model: IChildTableSettingsProps) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: IChildTableSettingsProps) => void;
}

function ChildDataTableSettings({ onSave, model, onValuesChange }: IChildDataTableSettingsProps) {
  const [toolbarModalVisible, setToolbarModalVisible] = useState(false);
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onSave} layout="vertical" onValuesChange={onValuesChange}>
      <SectionSeparator sectionName={'Display'} />

      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true }]}
        initialValue={model.title}
        tooltip="This can be a literal string like below 'Details for {{data.companyName}}'"
      >
        <Input placeholder="Details for {{data.companyName}}" />
      </Form.Item>

      <Form.Item
        name="parentEntityId"
        label="Parent Entity ID"
        rules={[{ required: true }]}
        initialValue={model.parentEntityId}
        tooltip="This can be a literal string like below 'Details for {{data.companyName}}'"
      >
        <Input placeholder="{{data.parentEntityId}}" />
      </Form.Item>

      <Form.Item name="allowQuickSearch" label="Allow Quick Search" valuePropName="checked">
        <Checkbox defaultChecked={model?.allowQuickSearch} />
      </Form.Item>

      <SectionSeparator sectionName="Toolbar" />

      <Button onClick={() => setToolbarModalVisible(true)}>Configure Toolbar</Button>

      <Form.Item name="toolbarItems" initialValue={model.toolbarItems}>
        <ToolbarSettingsModal
          visible={toolbarModalVisible}
          allowAddGroups={false}
          hideModal={() => {
            setToolbarModalVisible(false);
          }}
        />
      </Form.Item>
    </Form>
  );
}

export default ChildDataTableSettings;
