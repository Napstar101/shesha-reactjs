import React, { FC } from 'react';
import { Popover, Button, Form } from 'antd';
import { ConfigurableForm } from '../';
import { useUi } from '../../providers';

export interface IQuickViewProps {
    /**
     * The title for the quick view window
     */
    title: string;

    /**
     * Path to the form to display on the modal
     */
    displayFormPath: string;

    /**
     * The property to display from the model
     */
    displayPropertyName: string;

    /**
     * The url to use to get the detaills of the object
     */
    getDetailsUrl: string;

    /**
     * The id or guid for the entity
     */
    id: string;
}

const QuickView: FC<IQuickViewProps> = ({
    title,
    displayFormPath,
    // displayPropertyName,
    // getDetailsUrl,
    // id
}) => {

    const [form] = Form.useForm();

    const { formItemLayout } = useUi();

    const formContent = (
        <ConfigurableForm
            mode="readonly"
            {...formItemLayout}
            form={form}
            // onFinish={onFinish}
            path={displayFormPath}
        // markup={formMarkup}
        // onFieldsChange={onFieldsChange}
        // actions={actions}
        // sections={sections}
        />
    );

    return (
        <Popover content={formContent} title={title}>
            <Button type="primary">Hover me</Button>
        </Popover>
    );
};

export default QuickView;