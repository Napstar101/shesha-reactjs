import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useForm } from '../../../providers/form';
import { ISettingsFormFactory } from '../../../interfaces';
import { Empty } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { FormMarkup } from '../../../providers/form/models';
import GenericSettingsForm from '../genericSettingsForm';
import { useMetadata, useMetadataDispatcher } from '../../../providers';
import { MetadataContext } from '../../../providers/metadata/contexts';

export interface IProps {
}

export const ComponentPropertiesPanel: FC<IProps> = () => {
  const { updateComponent, selectedComponentId: id, getComponentModel, getToolboxComponent } = useForm();
  // note: we have to memoize the editor to prevent unneeded re-rendering and loosing of the focus
  const [editor, setEditor] = useState<ReactNode>(<></>);
  
  // @ts-ignore
  const { getActiveProvider, acti } = useMetadataDispatcher();
  const metaProvider = getActiveProvider();

  const debouncedSave = useDebouncedCallback(
    values => {
      updateComponent({ componentId: id, settings: { ...values, id: id } });
    },
    // delay in ms
    300
  );

  const onCancel = () => { };

  const onSave = values => {
    updateComponent({ componentId: id, settings: { ...values, id: id } });
  };

  const onValuesChange = (_changedValues, values) => {
    debouncedSave(values);
    /*
    form.validateFields()
      .then(validatedValues => {
        console.log({ validatedValues });
      })
      .catch((errorInfo: ValidateErrorEntity<any>) => {
        console.log({ errorInfo });
      });
    */
  };

  const getDefaultFactory = (markup: FormMarkup): ISettingsFormFactory => {
    return ({ model, onSave, onCancel, onValuesChange }) => {
      return (
        <GenericSettingsForm
          model={model}
          onSave={onSave}
          onCancel={onCancel}
          markup={markup}
          onValuesChange={onValuesChange}
        />
      );
    };
  };

  const wrapEditor = (renderEditor: () => ReactNode) => {
    if (!metaProvider)
      return <>{renderEditor()}</>;

    return (
      <MetadataContext.Provider value={metaProvider}>
        <>{renderEditor()}</>
      </MetadataContext.Provider>
    );
  }

  const getEditor = () => {
    const emptyEditor = null;
    if (!id) return;
    emptyEditor;

    const componentModel = getComponentModel(id);
    const toolboxComponent = getToolboxComponent(componentModel.type);
    if (!Boolean(toolboxComponent))
      return emptyEditor;

    const settingsFormFactory =
      'settingsFormFactory' in toolboxComponent
        ? toolboxComponent.settingsFormFactory
        : 'settingsFormMarkup' in toolboxComponent
          ? getDefaultFactory(toolboxComponent.settingsFormMarkup)
          : null;
    if (!settingsFormFactory) return emptyEditor;

    return wrapEditor(() =>
      <>
        {settingsFormFactory({
          model: componentModel,
          onSave,
          onCancel,
          onValuesChange,
        })}
      </>
    );
  };

  useEffect(() => {
    const editor = getEditor();
    setEditor(editor);
  }, [id]);

  if (!Boolean(id))
    return (
      <>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Please select a component to begin editing"></Empty>
        {/* <Form form={form}></Form>  */}
        {/* is used just to remove warning */}
      </>
    );

  return (
    <>
      {editor}
    </>
  );
};

export const TestConsumer: FC = () => {
  const meta = useMetadata(false);

  return (
    <div>
      <p>
        Metadata Provider: { meta ? "exists" : "missing" }
      </p>
      <p>
        Metadata: { meta && meta.metadata ? "loaded" : "not loaded" }
      </p>
    </div>
  );
}

export default ComponentPropertiesPanel;
