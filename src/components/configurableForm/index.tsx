import React, { FC } from 'react';
import ConfigurableFormRenderer from './configurableFormRenderer';
import { IConfigurableFormProps } from './models';
import { FormProvider } from '../../providers/form';
import ConfigurableComponent from '../appConfigurator/configurableComponent';
import EditViewMsg from '../appConfigurator/editViewMsg';
import { useShaRouting } from '../../providers/shaRouting';

export const ConfigurableForm: FC<IConfigurableFormProps> = props => {
  const { id, markup, mode, path, actions, sections, context, formRef, ...restProps } = props;

  const handleEditMode = Boolean(id) || Boolean(path);
  const { router } = useShaRouting();

  // const 

  return (
    <ConfigurableComponent
      canConfigure={handleEditMode}
      onStartEdit={() => {
        if (Boolean(id)) router?.push(`/settings/forms/designer?id=${id}`);
        else if (Boolean(path)) router?.push(`/settings/forms/designer?path=${path}`);
      }}
    >
      {(componentState, BlockOverlay) => (
        <div className={`${componentState.wrapperClassName}`}>
          <BlockOverlay>
            <EditViewMsg />
          </BlockOverlay>
          <FormProvider
            id={id}
            markup={markup}
            mode={mode}
            path={path}
            form={restProps.form}
            actions={actions}
            sections={sections}
            context={context}
            formRef={formRef}
          >
            <ConfigurableFormRenderer {...restProps} />
          </FormProvider>
        </div>
      )}
    </ConfigurableComponent>
  );
};

export default ConfigurableForm;
