import React, { useEffect } from 'react';
import { MainLayout, ValidationErrors, ConfigurableForm, IndexToolbar } from '../';
import { Form, Spin } from 'antd';
import { NextPage } from 'next';
import { requestHeaders } from '../../utils/requestHeaders';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useUi } from '../../providers';
import { FormMarkup } from '../../providers/form/models';
import { UseGenericGetProps, IDataFetcher, IDataMutator } from './models';
import { IToolbarItem } from '../../interfaces';
import { useShaRouting } from '../../providers/shaRouting';

interface IEditPageProps {
  id?: string;
  markup?: FormMarkup;
  fetcher: (props: UseGenericGetProps) => IDataFetcher;
  updater: (props: any) => IDataMutator;
  title?: (model: any) => string;
}

const EditPage: NextPage<IEditPageProps> = props => {
  const { loading: loading, refetch: doFetch, error: fetchError, data: serverData } = props.fetcher({
    lazy: true,
    requestOptions: { headers: requestHeaders() },
  });

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
  };

  const [form] = Form.useForm();

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const { mutate: save, loading: saving, error: savingError } = props.updater({});

  const goBack = () => {
    router.back();
  };

  const { router } = useShaRouting();
  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Save',
      icon: <SaveOutlined />,
      onClick: () => {
        form.submit();
      },
    },
    {
      title: 'Close',
      icon: <CloseOutlined />,
      onClick: () => goBack(),
    },
  ];

  const handleSubmit = values => {
    const postData = { ...values, id: model.id };
    save(postData).then(() => {
      goBack();
    });
  };

  const { formItemLayout } = useUi();
  const model = serverData?.result;

  return (
    <Spin spinning={loading || saving} tip="Please wait...">
      <MainLayout
        title={props.title ? props.title(model) : 'Edit'}
        showHeading={false}
        toolbar={<IndexToolbar items={toolbarItems} />}
      >
        <ValidationErrors error={savingError?.data || fetchError?.data}></ValidationErrors>
        {model && (
          <ConfigurableForm
            mode="edit"
            {...formItemLayout}
            form={form}
            onFinish={handleSubmit}
            path={router.pathname}
            initialValues={model}
          />
        )}
      </MainLayout>
    </Spin>
  );
};

export default EditPage;
