import React, { FC } from 'react';
import { Popover, Form } from 'antd';
import { ConfigurableForm } from '../';
import { useUi } from '../../providers';

export interface IQuickViewProps {

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
    title,
    formPath,
    formValues
}) => {

    const [form] = Form.useForm();
    const { formItemLayout } = useUi();

    const formContent = (
        <ConfigurableForm
            mode="readonly"
            {...formItemLayout}
            form={form}
            path={formPath}
            initialValues={formValues} />
    );

    return (
        <Popover content={formContent} title={title}>
            {children}
        </Popover>
    );
};

export default QuickView;