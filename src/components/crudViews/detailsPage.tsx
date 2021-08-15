import React, { useEffect, ReactNode, MutableRefObject, forwardRef, useImperativeHandle } from 'react';
import { Form, Spin } from 'antd';
import { requestHeaders } from '../../utils/requestHeaders';
import { IToolbarItem } from '../../interfaces';
import { MainLayout, IndexToolbar, ValidationErrors, ConfigurableForm } from '../';
import { useUi } from '../../providers';
import { FormMarkup, IFormActions } from '../../providers/form/models';
import { UseGenericGetProps, IDataFetcher } from './models';
import { useShaRouting } from '../../providers/shaRouting';
import { CommonCrudHandles } from './interfaces';
import { DEFAULT_FILTERS, filterGenericModelData, IGenericFormFilter } from './utils';

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

  /**
   * Form path. If not passed, router.pathname will be used instead.
   */
  formPath?: string;

  /**
   * Form actions. Page-specific actions which can be executed from the configurable form
   */
  formActions?: IFormActions;

  /**
   * ref object
   */
  pageRef?: MutableRefObject<any>;

  /**
   * A callback for when the data has been loaded
   */
  onDataLoaded?: (model: any) => void;

  /**
   * Form Values. If passed, model will be overridden to FormValues, m.
   */
  formValues?: any;

  /**
   * Handles Form Filters. Filters initial model
   */
  formFilters?: IGenericFormFilter;
}

const DetailsPage = forwardRef<CommonCrudHandles, IDetailsPageProps>((props, forwardedRef) => {
  const [form] = Form.useForm();

  useImperativeHandle(forwardedRef, () => ({
    refresh() {
      fetchData();
    },
  }));

  const { loading: loading, refetch: fetchData, error: fetchError, data: serverData } = props.fetcher({
    lazy: true,
    requestOptions: { headers: requestHeaders() },
    queryParams: { id: props.id },
  });

  // fetch data on page load or when the id changes
  useEffect(() => {
    fetchData();
  }, [props.id]);

  useEffect(() => {
    if (props?.formValues) {
      form.setFieldsValue(props.formValues);
    }
  }, [props?.formValues]);

  const filters = props.formFilters || DEFAULT_FILTERS;

  const model = filterGenericModelData(serverData?.result, filters) as any;

  const { formItemLayout } = useUi();

  useEffect(() => {
    if (props?.onDataLoaded) {
      props?.onDataLoaded(model);
    }
    if (props.pageRef) {
      props.pageRef.current = model;
    }
  }, [loading]);

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
        toolbar={
          props?.toolbarItems?.filter(({ hide }) => !hide)?.length ? <IndexToolbar items={props.toolbarItems} /> : null
        }
        headerControls={typeof props.headerControls === 'function' ? props.headerControls(model) : props.headerControls}
      >
        <ValidationErrors error={fetchError?.data}></ValidationErrors>
        {model && (
          <>
            <ConfigurableForm
              mode="readonly"
              {...formItemLayout}
              form={form}
              path={props?.formPath || router.pathname}
              markup={props.markup}
              initialValues={model}
              actions={props.formActions}
            />
            {typeof props?.footer === 'function' ? props?.footer(model) : props?.footer}
          </>
        )}
      </MainLayout>
    </Spin>
  );
});

export type DetailsPageHandleRefType = React.ElementRef<typeof DetailsPage>;

export default DetailsPage;
