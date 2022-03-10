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
     * The property to display from the model
     */
    displayPropertyName?: string;

    /**
     * Form Values. If passed, model will be overridden to FormValues, m.
     */
    formValues?: any;

    onFormValuesChange?: (changedValues: any, values: any) => void;
}

const QuickView: FC<IQuickViewProps> = ({
    children,
    title,
    formPath,
    // displayPropertyName,
    formValues,
    onFormValuesChange
}) => {

    const [form] = Form.useForm();
    const { formItemLayout } = useUi();

    const formContent = (
        <ConfigurableForm
            mode="readonly"
            {...formItemLayout}
            form={form}
            path={formPath}
            initialValues={formValues}
            onValuesChange={onFormValuesChange} />
    );

    return (
        <Popover content={formContent} title={title}>
            {children}
        </Popover>
    );
};

export default QuickView;