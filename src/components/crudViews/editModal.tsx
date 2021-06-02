import React, { FC, useEffect } from 'react';
import { Form, Modal, Spin } from 'antd';
import { ValidationErrors, ConfigurableForm } from '../';
import { FormInstance } from 'antd/lib/form';
import { useUi } from '../../providers';
import { UseGenericGetProps, IDataFetcher, IDataMutator } from './models';

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
}) => {
  const { loading: loadingInProgress, refetch: doFetch, error: fetchError, data: fetchedData } = fetcher({
    lazy: true,
  });

  const fetchData = async () => {
    await doFetch({ queryParams: { id: id } });
  };
  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const { mutate: save, error: saveError, loading: saveInProgress } = updater({});

  const [form] = Form.useForm();

  const handleSubmit = values => {
    const preparedValues = typeof prepareValues === 'function' ? prepareValues(values) : values;
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
          />
        )}
      </Spin>
    </Modal>
  );
};
export default ModalForm;
