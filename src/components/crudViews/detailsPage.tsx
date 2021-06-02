import React, { FC, useEffect, ReactNode } from 'react';
import { Spin } from 'antd';
import { requestHeaders } from '../../utils/requestHeaders';
import { IToolbarItem } from '../../interfaces';
import { MainLayout, IndexToolbar, ValidationErrors, ConfigurableForm } from '../';
import { useUi } from '../../providers';
import { FormMarkup } from '../../providers/form/models';
import { UseGenericGetProps, IDataFetcher } from './models';
import { useShaRouting } from '../../providers/shaRouting';

export interface IDetailsPageProps {
  id?: string;
  formId?: string;
  fetcher: (props: UseGenericGetProps) => IDataFetcher;
  markup?: FormMarkup;
  title?: string;
  toolbarItems?: IToolbarItem[];
  footer?: ReactNode | ((model: any) => ReactNode);
}

const DetailsPage: FC<IDetailsPageProps> = props => {
  const { loading: loading, refetch: doFetch, error: fetchError, data: serverData } = props.fetcher({
    lazy: true,
    requestOptions: { headers: requestHeaders() },
  });

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
  };

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const model = serverData?.result;
  const { formItemLayout } = useUi();

  const { router } = useShaRouting();

  return (
    <Spin spinning={loading} tip="Loading...">
      <MainLayout
        title={props.title}
        description=""
        showHeading={false}
        toolbar={<IndexToolbar items={props.toolbarItems} />}
      >
        <ValidationErrors error={fetchError?.data}></ValidationErrors>
        {model && (
          <>
            <ConfigurableForm
              mode="readonly"
              {...formItemLayout}
              path={router.pathname}
              markup={props.markup}
              initialValues={model}
            />
            {typeof props?.footer === 'function' ? props?.footer(model) : props?.footer}
          </>
        )}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
