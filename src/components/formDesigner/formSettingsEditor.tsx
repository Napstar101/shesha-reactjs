import React, { FC } from 'react';
import { Form, Modal } from 'antd';
import { ConfigurableForm } from '../../components';
import formSettingsJson from './formSettings.json';
import { FormMarkup } from '../../providers/form/models';
import { useForm } from '../../providers/form';

//import { useDebouncedCallback } from 'use-debounce';

export interface IFormSettingsEditorProps {
  isVisible: boolean;
  close: () => void;
}

export const FormSettingsEditor: FC<IFormSettingsEditorProps> = ({ isVisible, close }) => {
  const [form] = Form.useForm();
  const { formSettings, updateFormSettings } = useForm();

  /*
    const debouncedUpdateFormSettings = useDebouncedCallback(
        values => {
            updateFormSettings(values);
        },
        // delay in ms
        300
      );
    useEffect(() => {
      form.resetFields();
    });


    updateFormSettings
*/
  const onSave = values => {
    updateFormSettings(values);
    close();
  };

  return (
    <Modal
      visible={isVisible}
      title="Form Settings"
      onOk={() => {
        form.submit();
      }}
      onCancel={close}
      width="50vw"
    >
      <ConfigurableForm
        layout="horizontal"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        mode="edit"
        form={form}
        onFinish={onSave}
        markup={formSettingsJson as FormMarkup}
        initialValues={formSettings}
        //onValuesChange={debouncedUpdateFormSettings}
      />
    </Modal>
  );
};

export default FormSettingsEditor;
