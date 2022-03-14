import React, { FC, useEffect, useState } from 'react';
import { Popover, Form, Button } from 'antd';
import { ConfigurableForm } from '../';
import { useUi } from '../../providers';
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

  getEntityUrl: string;

  /**
   * Form Values. If passed, model will be overridden to FormValues, m.
   */
  formValues?: any;

  width?: number;
}

const QuickView: FC<Omit<IQuickViewProps, 'children'>> = ({ entityId, title, formPath, getEntityUrl, width = 600 }) => {
  const [state, setState] = useState();

  const [form] = Form.useForm();
  const { formItemLayout } = useUi();
  const { refetch, loading, data, error } = useGet({
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

  const formContent = (
    <ConfigurableForm mode="readonly" {...formItemLayout} form={form} path={formPath} initialValues={state} />
  );

  return (
    <Popover content={<div style={{ width }}>{formContent}</div>} title={title}>
      <Button type="link">{title}</Button>
    </Popover>
  );
};

export default QuickView;
