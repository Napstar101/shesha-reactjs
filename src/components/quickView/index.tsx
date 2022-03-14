import React, { FC, useEffect, useState } from 'react';
import { Popover, Form, Button, notification } from 'antd';
import { ConfigurableForm } from '../';
import { useUi } from '../../providers';
import { useGet } from 'restful-react';
import ValidationErrors from '../validationErrors';

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
     * The Url that details of the entity are retreived
     */
    getEntityUrl: string;

    /**
     * Override the property that is displayed in the parent form and popover title
     */
    // displayProperty?: string;

    /**
     * The width of the quickview
     */
    width?: number;
}

const QuickView: FC<Omit<IQuickViewProps, 'children'>> = ({
    entityId,
    title,
    formPath,
    getEntityUrl,
    // displayProperty,
    width = 450
}) => {
    const [state, setState] = useState();

    const [form] = Form.useForm();
    const { formItemLayout } = useUi();
    const { refetch, loading, data, error: fetchEntityError } = useGet({
        path: getEntityUrl || '',
        queryParams: { id: entityId },
        lazy: true,
    });

    useEffect(() => {
        if (getEntityUrl && entityId) {
            refetch();
        }
    }, [entityId, getEntityUrl]);

    useEffect(() => {
        if (!loading && data) {
            setState(data.result);
        }
    }, [loading, data]);

    useEffect(() => {
        if (fetchEntityError) {
          notification.error({ message: <ValidationErrors error={fetchEntityError} renderMode="raw" /> });
        }
      }, [fetchEntityError]);

    const formContent = (
        <ConfigurableForm
            mode="readonly"
            {...formItemLayout}
            form={form}
            path={formPath}
            initialValues={state} />
    );

    return (
        <Popover content={<div style={{ width }}>{formContent}</div>} title={title}>
            <Button type="link">{title}</Button>
        </Popover>
    );
};

export default QuickView;