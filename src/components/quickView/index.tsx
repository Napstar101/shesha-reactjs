import React, { FC, useEffect, useState } from 'react';
import { Popover, Form } from 'antd';
import { ConfigurableForm } from '../';
import { useUi, useForm } from '../../providers';
import { useGet } from 'restful-react';

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
    formPath?: string;

    /**
     * Form Values. If passed, model will be overridden to FormValues, m.
     */
    formValues?: any;
}

const QuickView: FC<IQuickViewProps> = ({
    children,
    entityId,
    title,
    formPath,
    formValues
}) => {

    const [state, setState] = useState();
    const { formSettings } = useForm();
    const [form] = Form.useForm();
    const { formItemLayout } = useUi();
    const { refetch, loading, data, error } = useGet({ path: formSettings.getUrl || "", queryParams: { id: entityId }, lazy: true });

    useEffect(() => {
        if (formSettings.getUrl && entityId) {
            refetch();
        }
    }, [entityId, formSettings]);

    useEffect(() => {
        if (!loading && data) {
            setState(data.result);
        }
    }, [loading, data]);

    const formContent = (
        <ConfigurableForm
            mode="readonly"
            {...formItemLayout}
            form={form}
            path={formPath}
            initialValues={state} />
    );

    return (
        <Popover content={formContent} title={title}>
            {children}
        </Popover>
    );
};

export default QuickView;