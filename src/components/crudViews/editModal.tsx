import React, { FC, useEffect } from 'react';
import { Form, Modal, Spin } from 'antd';
import { ValidationErrors, ConfigurableForm } from '../';
import { FormInstance } from 'antd/lib/form';
import { useUi } from '../../providers';
import { UseGenericGetProps, IDataFetcher, IDataMutator } from './models';
import { IFormActions, IFormSections } from '../../providers/form/models';

interface IModalProps {
  id: string;
  title?: (model: any) => string;
  visible: boolean;
  formPath: string;
  fetcher: (props: UseGenericGetProps) => IDataFetcher;
  updater: (props: any) => IDataMutator;
  onCancel: (form: FormInstance) => void;
  onSuccess: (form: FormInstance) => void;
  prepareValues?: (values: any) => any;
  onFieldsChange?: (changedFields: any[], allFields: any[]) => void;
  beforeSubmit?: (form: any) => boolean;
  actions?: IFormActions;
  sections?: IFormSections;
  destroyOnClose?: boolean;
}

const ModalForm: FC<IModalProps> = ({
  id,
  visible,
  onCancel,
  onSuccess,
  fetcher,
  updater,
  title,
  formPath,
  prepareValues,
  onFieldsChange,
  beforeSubmit,
  actions,
  sections,
  destroyOnClose = true,
}) => {
  const { loading: loadingInProgress, refetch: doFetch, error: fetchError, data: fetchedData } = fetcher({
    lazy: true,
  });

  const fetchData = async () => {
    await doFetch({ queryParams: { id } });
  };

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const { mutate: save, error: saveError, loading: saveInProgress } = updater({});

  const [form] = Form.useForm();

  const handleSubmit = values => {
    // We must always use updated values, in case the user had prepared values by then also update the values in the form
    const preparedValues = typeof prepareValues === 'function' ? { ...prepareValues(values), ...values } : values;

    if (beforeSubmit && !beforeSubmit(preparedValues)) {
      return;
    }

    save(preparedValues).then(() => {
      onSuccess(form);
    });
  };

  const handleCancel = () => {
    onCancel(form);
  };

  const { formItemLayout } = useUi();

  const model = fetchedData?.result;

  return (
    <Modal
      width="60%"
      visible={visible}
      title={title ? title(model) : 'Edit'}
      okText="Save"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={saveInProgress}
      destroyOnClose={destroyOnClose}
    >
      <Spin spinning={loadingInProgress || saveInProgress} tip="Please wait...">
        <ValidationErrors error={saveError?.data || fetchError?.data}></ValidationErrors>
        {model && (
          <ConfigurableForm
            mode="edit"
            {...formItemLayout}
            form={form}
            onFinish={handleSubmit}
            path={formPath}
            initialValues={model}
            onFieldsChange={onFieldsChange}
            actions={actions}
            sections={sections}
          />
        )}
      </Spin>
    </Modal>
  );
};
export default ModalForm;
