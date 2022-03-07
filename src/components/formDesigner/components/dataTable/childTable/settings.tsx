import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { SectionSeparator } from '../../../..';
import { IChildTableSettingsProps } from './models';
import { ToolbarSettingsModal } from '../../dataTable/toolbar/toolbarSettingsModal';
import TableViewSelectorSettingsModal from '../tableViewSelector/tableViewSelectorSettingsModal';

export interface IChildDataTableSettingsProps {
  model: IChildTableSettingsProps;
  onSave: (model: IChildTableSettingsProps) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: IChildTableSettingsProps) => void;
}

interface IChildDataTableSettingsState {
  toolbarModalVisible?: boolean;
  filtersModalVisible?: boolean;
}

function ChildDataTableSettings({ onSave, model, onValuesChange }: IChildDataTableSettingsProps) {
  const [state, setState] = useState<IChildDataTableSettingsState>({});

  const [form] = Form.useForm();

  const toggleToolbarModal = () => setState(prev => ({ ...prev, toolbarModalVisible: !prev?.toolbarModalVisible }));

  const toggleFiltersModal = () => setState(prev => ({ ...prev, filtersModalVisible: !prev?.filtersModalVisible }));

  return (
    <Form
      form={form}
      onFinish={onSave}
      layout="vertical"
      onValuesChange={(a, b) => {
        console.log('onValuesChange a, b :>> ', a, b);

        onValuesChange(a, b);
      }}
    >
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

      <Button onClick={toggleToolbarModal}>Configure Toolbar</Button>

      <Form.Item name="toolbarItems" initialValue={model.toolbarItems}>
        <ToolbarSettingsModal
          visible={state?.toolbarModalVisible}
          allowAddGroups={false}
          hideModal={toggleToolbarModal}
        />
      </Form.Item>

      <SectionSeparator sectionName="Filter" />

      <Button onClick={toggleFiltersModal}>Customise Filters</Button>

      <Form.Item name="filters" initialValue={model.filters}>
        <TableViewSelectorSettingsModal visible={state?.filtersModalVisible} hideModal={toggleFiltersModal} />
      </Form.Item>
    </Form>
  );
}

export default ChildDataTableSettings;
