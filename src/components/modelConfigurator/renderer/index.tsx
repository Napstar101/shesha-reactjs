import React, { FC } from 'react';
import modelSettingsMarkup from '../modelSettings.json';
import { ErrorBoundary } from '../..';
import ConfigurableForm from '../../configurableForm';
import { FormMarkup } from '../../../providers/form/models';
import { PropertiesEditorComponent } from '../propertiesEditor';
import { ModelConfiguratorToolbar } from '../toolbar';
import { useModelConfigurator } from '../../..';
import { message } from 'antd';

export interface IModelConfiguratorRendererProps {
}

export const ModelConfiguratorRenderer: FC<IModelConfiguratorRendererProps> = () => {
  const { modelConfiguration, form, save, id } = useModelConfigurator();

  const onSettingsSave = values => {
    const dto = { ...values, id };
    save(dto)
      .then(() => message.success('Model saved successfully'))
      .catch(() => message.error('Failed to save model')); ;
  };

  const initialValues = {...modelConfiguration};

  return (
    <div className="sha-model-configurator">
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
          initialValues={initialValues}
          sections={{
            properties: () => (<PropertiesEditorComponent></PropertiesEditorComponent>)
          }}
        ></ConfigurableForm>
      </ErrorBoundary>
    </div>
  );
};

export default ModelConfiguratorRenderer;