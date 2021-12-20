import React, { FC } from 'react';
//import { PropertiesEditor } from './propertiesEditor';
import modelSettingsMarkup from './modelSettings.json';
import { ConfigurableForm, ErrorBoundary } from '..';
import { FormMarkup } from '../../providers/form/models';
import { Form } from 'antd';
//import { useDebouncedCallback } from 'use-debounce/lib';
import { Test } from './test';

export interface IModelConfiguratorProps { }

export const ModelConfigurator: FC<IModelConfiguratorProps> = () => {

  const [form] = Form.useForm();

  // const onSettingsSave = values => {
  //   console.log(values);
  // };

  // const debouncedSave = useDebouncedCallback(
  //   values => {
  //     console.log(values);
  //     //updateItem({ id: selectedItemId, settings: values });
  //   },
  //   // delay in ms
  //   300
  // );


  return (
    <>
      <ErrorBoundary>
        <Test></Test>
      </ErrorBoundary>

      {true && (
        <ErrorBoundary>
          <ConfigurableForm
            size='small'
            //formRef={formRef}
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            mode="edit"
            markup={modelSettingsMarkup as FormMarkup}
            //onFinish={onSettingsSave}
            form={form}
            // initialValues={componentModel}
            //onValuesChange={debouncedSave}
          ></ConfigurableForm>
        </ErrorBoundary>
      )}
      {/* {false && (
        <ErrorBoundary>
          <PropertiesEditor>

          </PropertiesEditor>
        </ErrorBoundary>
      )} */}
    </>
  );
};

export default ModelConfigurator;