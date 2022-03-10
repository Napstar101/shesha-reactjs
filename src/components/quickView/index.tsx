import React, { useEffect, FC } from 'react';
import { Popover, Form } from 'antd';
import { requestHeaders } from '../../utils/requestHeaders';
import { ConfigurableForm } from '../';
import { useUi } from '../../providers';
import { DEFAULT_FILTERS, filterGenericModelData, IGenericFormFilter } from '../crudViews/utils';
import { UseGenericGetProps, IDataFetcher } from '../crudViews/models';

export interface IQuickViewProps {
    /**
     * The id or guid for the entity
     */
    entityId?: string;

    /**
     * The title for the quick view window
     */
    title?: string;

    /**
     * Path to the form to display on the modal
     */
    displayFormPath?: string;

    /**
     * The property to display from the model
     */
    displayPropertyName?: string;

    /**
     * The url to use to get the detaills of the object
     */
    getDetailsUrl?: string;

    /**
     * A get API to be called with the id to get the details of the form
     */
    fetcher: (props: UseGenericGetProps) => IDataFetcher;

    /**
     * A callback for when the data has been loaded
     */
    onDataLoaded?: (model: any) => void;

    onFormValuesChange?: (changedValues: any, values: any) => void;

    /**
     * Form Values. If passed, model will be overridden to FormValues, m.
     */
    formValues?: any;

    /**
     * Handles Form Filters. Filters initial model
     */
    formFilters?: IGenericFormFilter;
}

const QuickView: FC<IQuickViewProps> = ({
    children,
    // forwardedRef,
    entityId,
    title,
    displayFormPath,
    // displayPropertyName,
    // getDetailsUrl,
    formFilters,
    fetcher,
    onFormValuesChange,
    formValues,
    onDataLoaded
}) => {

    const [form] = Form.useForm();

    const { loading: loading, refetch: fetchData, data: serverData } = fetcher({
        lazy: true,
        requestOptions: { headers: requestHeaders() },
        queryParams: { id: entityId },
    });

    // fetch data on page load or when the id changes
    useEffect(() => {
        fetchData();
    }, [entityId]);

    useEffect(() => {
        if (formValues) {
            form.setFieldsValue(formValues);
        }
    }, [formValues]);

    const filters = formFilters || DEFAULT_FILTERS;

    const model = (filterGenericModelData(serverData?.result, filters) as any) || {};
    // const initialValues = (filterGenericModelData(formValues, filters) as any) || model;

    const { formItemLayout } = useUi();

    useEffect(() => {
        if (onDataLoaded) {
            onDataLoaded(model);
        }
    }, [loading]);

    const formContent = (
        <ConfigurableForm
            mode="readonly"
            {...formItemLayout}
            form={form}
            path={displayFormPath}
            initialValues={{ membershipNumber: "00000000" }}
            onValuesChange={onFormValuesChange} />
    );

    return (
        <Popover content={formContent} title={title}>
            {children}
        </Popover>
    );
};

export default QuickView;