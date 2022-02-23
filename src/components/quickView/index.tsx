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
     * The id or guid for the entity
     */
    // id: string;

    /**
     * Path to the form to display on the modal
     */
    formPath: string;
}

const QuickView: FC<IQuickViewProps> = ({
    title,
    // id,
    formPath,
}) => {

    const [form] = Form.useForm();

    const { formItemLayout } = useUi();

    const formContent = (
        <ConfigurableForm
            mode="readonly"
            {...formItemLayout}
            form={form}
            // onFinish={onFinish}
            path={formPath}
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