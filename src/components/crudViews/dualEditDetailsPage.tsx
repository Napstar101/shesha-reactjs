import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, FormInstance, Spin } from 'antd';
import React, { forwardRef, MutableRefObject, ReactNode, useEffect, useImperativeHandle } from 'react';
import { ConfigurableForm, IndexToolbar, MainLayout, ValidationErrors } from '..';
import { IToolbarItem } from '../../interfaces';
import { useUi } from '../../providers';
import { FormMarkup, IFormActions, IFormSections } from '../../providers/form/models';
import { useShaRouting } from '../../providers/shaRouting';
import { requestHeaders } from '../../utils/requestHeaders';
import { CommonCrudHandles } from './interfaces';
import { IDataFetcher, IDataMutator, UseGenericGetProps } from './models';
import { DEFAULT_FILTERS, filterGenericModelData, IGenericFormFilter } from './utils';

export type DualEditDetailsFormType = 'Edit' | 'Details';

export interface IDualEditDetailsPageProps {
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
   * A post API to be called with the id to set the details of the form
   */
  updater: (props: any) => IDataMutator;

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
    * Form sections. Form-specific sections which can be rendered within the configurable form
    */
  formSections?: IFormSections;

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
   * Form Type. Must be passed, indicates whether it renders Edit or Details
   */
  formType: DualEditDetailsFormType;

  /**
   * Handles Save event. Only applicable if formType is Edit
   */
  onSave?: (form?: FormInstance) => void;

  /**
   * Handles Close event. Only applicable if formType is Edit
   */
  onClose?: (form?: FormInstance) => void;

  /**
   * Handles Form Filters. Filters initial model
   */
  formFilters?: IGenericFormFilter;

  /**
   * A function to prepare modal values
   */
  prepareValues?: (values: any) => any;
}

const DualEditDetailsPage = forwardRef<CommonCrudHandles, IDualEditDetailsPageProps>((props, forwardedRef) => {
  const [form] = Form.useForm();

  const { formItemLayout } = useUi();

  const { router } = useShaRouting();

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

  const { mutate: save, loading: saving, error: savingError } = props.updater({});

  // fetch data on page load or when the id changes
  useEffect(() => {
    fetchData();
  }, [props.id]);

  useEffect(() => {
    if (props?.formValues) {
      form.setFieldsValue(props.formValues);
    }
  }, [props?.formValues]);

  useEffect(() => {
    if (props?.onDataLoaded) {
      props?.onDataLoaded(model);
    }
    if (props.pageRef) {
      props.pageRef.current = model;
    }
  }, [loading]);

  const filters = props.formFilters || DEFAULT_FILTERS;

  const model = filterGenericModelData(serverData?.result, filters) as any;

  const renderTitle = () => {
    const { title } = props;

    if (title) {
      return typeof title === 'string' ? title : title(model);
    }

    return props?.formType?.toString();
  };

  const handleSave = () => {
    if (props?.onSave) props.onSave(form);
    else form.submit();
  };

  const handleClose = () => {
    if (props?.onClose) props.onClose(form);
    else router.back();
  };

  const editToolbarItems: IToolbarItem[] = [
    {
      title: 'Save',
      icon: <SaveOutlined />,
      onClick: handleSave,
    },
    {
      title: 'Close',
      icon: <CloseOutlined />,
      onClick: handleClose,
    },
  ];

  const handleSubmit = values => {
    const postData = { ...values, id: model.id };
    const preparedValues = typeof props?.prepareValues === 'function' ? props?.prepareValues(postData) : postData;

    save(preparedValues).then(handleClose);
  };

  const toolbar = () => {
    if (props.formType === 'Details') {
      return props?.toolbarItems?.filter(({ hide }) => !hide)?.length ? (
        <IndexToolbar items={props.toolbarItems} />
      ) : null;
    }

    return <IndexToolbar items={editToolbarItems} />;
  };

  return (
    <Spin spinning={loading || saving} tip="Loading...">
      <MainLayout
        title={renderTitle()}
        description=""
        showHeading={!!renderTitle() || !!props.headerControls}
        toolbar={toolbar()}
        headerControls={typeof props.headerControls === 'function' ? props.headerControls(model) : props.headerControls}
      >
        <ValidationErrors error={savingError?.data || fetchError?.data} />
        {model && (
          <>
            <ConfigurableForm
              mode={props.formType === 'Details' ? 'readonly' : 'edit'}
              {...formItemLayout}
              form={form}
              onFinish={handleSubmit}
              path={props?.formPath || router.pathname}
              markup={props.markup}
              initialValues={model}
              actions={props.formActions}
              sections={props.formSections}
            />
            {typeof props?.footer === 'function' ? props?.footer(model) : props?.footer}
          </>
        )}
      </MainLayout>
    </Spin>
  );
});

export type DualEditDetailsPageHandleRefType = React.ElementRef<typeof DualEditDetailsPage>;

export default DualEditDetailsPage;
