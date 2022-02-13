import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { SectionSeparator } from '../../../..';
import { IDetailsViewProps } from './models';
import { CodeEditor } from '../../codeEditor/codeEditor';
import { ToolbarSettingsModal } from '../../dataTable/toolbar/toolbarSettingsModal';

const OPTIONS = [
  {
    id: 'm8ftW2-rhDwiwPi92shLu',
    label: 'Cancelled',
    value: '#f50',
  },
  {
    id: 'VVJYg-lDKV8at0NPXXhdD',
    label: 'New',
    value: '#2db7f5',
  },
  {
    id: 'hIMuJBAr_VItu0baUFuPK',
    label: 'Success',
    value: '#87d068',
  },
  {
    id: 'ZNsHU7t77OD6Q6Xl8tIgF',
    label: 'Active',
    value: '#108ee9',
  },
  {
    id: 'AeAQg30fuaWLAJ6pcVFk-',
    label: 'Rejected',
    value: '#55acee',
  },
];

export interface IDetailsPageSettingsProps {
  model: IDetailsViewProps;
  onSave: (model: IDetailsViewProps) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: IDetailsViewProps) => void;
}

function DetailsViewSettings({ onSave, model, onValuesChange }: IDetailsPageSettingsProps) {
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
        <Input />
      </Form.Item>

      <Form.Item name="path" label="Path" rules={[{ required: true }]} initialValue={model.path}>
        <Input />
      </Form.Item>

      <Form.Item name="backUrl" label="Back Url" initialValue={model?.backUrl}>
        <Input />
      </Form.Item>

      <SectionSeparator sectionName="Status" />

      <Form.Item name="statusName" label="Status name" initialValue={model?.statusName}>
        <Input />
      </Form.Item>

      <Form.Item name="statusColor" label="Status color" initialValue={model?.statusColor}>
        <Select>
          {OPTIONS.map(({ id, label, value }) => (
            <Select.Option key={id} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="statusCustomColor" label="Status color expression" initialValue={model?.statusName}>
        <CodeEditor
          label="Custom code"
          description="Something"
          mode="dialog"
          setOptions={{ minLines: 20, maxLines: 500, fixedWidthGutter: true }}
          name={'custom'}
          type={'sdfsdfsd'}
          id={'dsdffd'}
        />
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

export default DetailsViewSettings;
