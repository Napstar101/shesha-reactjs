import React, { FC } from 'react';
import modelSettingsMarkup from '../modelSettings.json';
import { ErrorBoundary } from '../..';
import ConfigurableForm from '../../configurableForm';
import { FormMarkup } from '../../../providers/form/models';
import { Form } from 'antd';
import { useDebouncedCallback } from 'use-debounce/lib';
import PropertiesEditor from '../propertiesEditor';
import { ModelConfiguratorToolbar } from '../toolbar';
import { useModelConfigurator } from '../../..';

export interface IModelConfiguratorRendererProps { 
}

export const ModelConfiguratorRenderer: FC<IModelConfiguratorRendererProps> = () => {
  const [form] = Form.useForm();
  const { className, namespace, friendlyName, discriminatorValue, tableName, typeShortAlias } = useModelConfigurator();

  /*const [fields, setFields] = useState([]);

  const onTestClick = () => {
    console.log({ fields });
  }*/

  const onSettingsSave = values => {
    console.log(values);
  };

  const debouncedSave = useDebouncedCallback(
    values => {
      console.log(values);
      //updateItem({ id: selectedItemId, settings: values });
    },
    // delay in ms
    300
  );

  
  /*
  const onFieldsChange = (changedFields: any[], allFields: any[]) => {
    console.log({ changedFields, allFields });
    setFields(changedFields);
  }
  */

  const initialValues = { className, namespace, friendlyName, discriminatorValue, tableName, typeShortAlias };

  return (
    <>
      <ModelConfiguratorToolbar></ModelConfiguratorToolbar>
      <ErrorBoundary>
        <ConfigurableForm
          layout="horizontal"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 13 }}
          mode="edit"
          markup={modelSettingsMarkup as FormMarkup}
          onFinish={onSettingsSave}
          form={form}
          onValuesChange={debouncedSave}
          initialValues={initialValues}
          // onFieldsChange={onFieldsChange}
          // fields={fields}
        ></ConfigurableForm>
        {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
      </ErrorBoundary>

      <ErrorBoundary>
        <PropertiesEditor>

        </PropertiesEditor>
      </ErrorBoundary>
    </>
  );
};

export default ModelConfiguratorRenderer;