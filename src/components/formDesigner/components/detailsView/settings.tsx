import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { SectionSeparator } from '../../..';
import { IDetailsViewProps } from './models';
import { CodeEditor } from '../codeEditor/codeEditor';

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
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onSave} layout="vertical" onValuesChange={onValuesChange}>
      <SectionSeparator sectionName={'Display'} />

      <Form.Item name="title" label="Title" rules={[{ required: true }]} initialValue={model.title}>
        <Input />
      </Form.Item>

      <Form.Item name="path" label="Path" rules={[{ required: true }]} initialValue={model.path}>
        <Input />
      </Form.Item>

      <Form.Item name="backUrl" label="Back Url" initialValue={model?.backUrl}>
        <Input />
      </Form.Item>

      <Form.Item name="statusName" label="Status name property" initialValue={model?.statusName}>
        <Input />
      </Form.Item>

      <Form.Item name="status" label="Status name property" initialValue={model?.statusName}>
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

      <Form.Item name="statusColor" label="Status color" initialValue={model?.statusColor}>
        <Select>
          {OPTIONS.map(({ id, label, value }) => (
            <Select.Option key={id} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="custom" label="Status name property" initialValue={model?.statusName}>
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

      <Form.Item name="custom" label="Status name property" initialValue={model?.statusName}>
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

      <Button>Configure Toolbar</Button>
    </Form>
  );
}

export default DetailsViewSettings;
