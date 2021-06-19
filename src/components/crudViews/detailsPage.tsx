import React, { FC, useEffect, ReactNode } from 'react';
import { Spin } from 'antd';
import { requestHeaders } from '../../utils/requestHeaders';
import { IToolbarItem } from '../../interfaces';
import { MainLayout, IndexToolbar, ValidationErrors, ConfigurableForm } from '../';
import { useUi } from '../../providers';
import { FormMarkup } from '../../providers/form/models';
import { UseGenericGetProps, IDataFetcher } from './models';
import { useShaRouting } from '../../providers/shaRouting';
import { useMemo } from 'react';

export interface IDetailsPageProps {
  /**
   * The id of an entity whose details are to be rendered
   */
  id?: string;

  /**
   * The id of the form that will be used to render the entity. If not passed, the pathname will be used as the form id
   */
  formId?: string;

  /**
   * A get API to be called with the id to get the details of the form
   */
  fetcher: (props: UseGenericGetProps) => IDataFetcher;

  /**
   * The form markup
   */
  markup?: FormMarkup;

  /**
   * The title of this page
   */
  title?: ((model: any) => string) | string;

  /**
   *
   */
  toolbarItems?: IToolbarItem[];

  /**
   *
   */
  footer?: ReactNode | ((model: any) => ReactNode);

  /**
   * Used to display the statuses of the entity as well as the reference numbers
   */
  headerControls?: ReactNode | ((model: any) => ReactNode);

  formPath?: string;
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

  const renderTitle = () => {
    const { title } = props;

    if (title) {
      return typeof title === 'string' ? title : title(model);
    }

    return 'Details';
  };

  return (
    <Spin spinning={loading} tip="Loading...">
      <MainLayout
        title={renderTitle()}
        description=""
        showHeading={!!renderTitle() || !!props.headerControls}
        // toolbar={<IndexToolbar items={props.toolbarItems || []} elementsRight="Something" />}
        toolbar={<IndexToolbar items={props.toolbarItems || []} />}
        headerControls={typeof props.headerControls === 'function' ? props.headerControls(model) : props.headerControls}
      >
        <ValidationErrors error={fetchError?.data}></ValidationErrors>
        {model && (
          <>
            <ConfigurableForm
              mode="readonly"
              {...formItemLayout}
              path={props?.formPath || router.pathname}
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
