import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useToolbarConfigurator } from '../../../../../providers/toolbarConfigurator';
import { Empty, Form } from 'antd';
import { ConfigurableForm } from '../../../../../components';
import itemSettingsJson from './itemSettings.json';
import itemGroupSettingsJson from './itemGroupSettings.json';
import { FormMarkup } from '../../../../../providers/form/models';
import { useDebouncedCallback } from 'use-debounce';
import { ConfigurableFormInstance } from '../../../../../providers/form/contexts';
import React from 'react';

export interface IProps {}

export const ToolbarItemProperties: FC<IProps> = () => {
  const { selectedItemId, getItem, updateItem } = useToolbarConfigurator();
  // note: we have to memoize the editor to prevent unneeded re-rendering and loosing of the focus
  const [editor, setEditor] = useState<ReactNode>(<></>);
  const [form] = Form.useForm();

  const formRef = useRef<ConfigurableFormInstance>(null);

  const debouncedSave = useDebouncedCallback(
    values => {
      updateItem({ id: selectedItemId, settings: values });
    },
    // delay in ms
    300
  );

  useEffect(() => {
    form.resetFields();

    if (formRef.current) {
      const values = form.getFieldsValue();

      formRef.current.setFormData({ values: values, mergeValues: false });
    }
  }, [selectedItemId]);

  const getEditor = () => {
    const emptyEditor = null;
    if (!selectedItemId) return emptyEditor;

    const componentModel = getItem(selectedItemId);

    const markup =
      componentModel.type === 'item'
        ? (itemSettingsJson as FormMarkup)
        : componentModel.type === 'group'
        ? (itemGroupSettingsJson as FormMarkup)
        : [];
    return (
      <ConfigurableForm
        formRef={formRef}
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        mode="edit"
        markup={markup}
        onFinish={onSettingsSave}
        form={form}
        initialValues={componentModel}
        onValuesChange={debouncedSave}
      ></ConfigurableForm>
    );
  };

  useEffect(() => {
    const editor = getEditor();
    setEditor(editor);
  }, [selectedItemId]);

  if (!Boolean(selectedItemId)) {
    return (
      <div>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Please select a component to begin editing"></Empty>
      </div>
    );
  }

  const onSettingsSave = values => {
    console.log(values);
  };

  return <>{editor}</>;
};

export default ToolbarItemProperties;
