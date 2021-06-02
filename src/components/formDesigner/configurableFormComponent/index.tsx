import { FC, useRef } from 'react';
import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import FormComponent from '../formComponent';
import { useForm } from '../../../providers/form';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import React from 'react';
import ErrorBoundary from '../../errorBoundary/errorBoundary';
import DragHandle from './dragHandle';
import ValidationIcon from './validationIcon';

export interface IProps {
  id: string;
  index: number;
}

const ConfigurableComponent: FC<IProps> = ({ id /*, index*/ }) => {
  const { formMode, visibleComponentIds } = useForm();
  const componentRef = useRef(null);

  const { deleteComponent, getComponentModel, selectedComponentId } = useForm();
  const onDeleteClick = () => {
    deleteComponent({ componentId: id });
  };

  const componentModel = getComponentModel(id);

  const isDesignMode = formMode === 'designer';
  const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(componentModel.id);

  const renderComponent = () => {
    return (
      <ErrorBoundary>
        <FormComponent id={id} componentRef={componentRef}></FormComponent>
      </ErrorBoundary>
    );
  };

  if (!isDesignMode) return renderComponent();

  const invalidConfiguration = componentModel.settingsValidationErrors && componentModel.settingsValidationErrors.length > 0;

  let classes = ['sha-component'];
  if (selectedComponentId === id) classes.push('selected');
  if (invalidConfiguration) classes.push('has-config-errors');

  return (
    <div className={classes.reduce((a, c) => a + ' ' + c)}>
      {(componentModel.hidden || hiddenByCondition) && (
        <div className="sha-component-invisible-indicator">
          <EyeInvisibleOutlined />
        </div>
      )}
      { invalidConfiguration && <ValidationIcon validationErrors={componentModel.settingsValidationErrors}></ValidationIcon> }
      <div className="sha-component-controls">
        <Button icon={<DeleteFilled color="red" />} onClick={onDeleteClick} size="small" danger></Button>
      </div>
      <div>
        <DragHandle componentId={id} componentRef={componentRef}></DragHandle>
        <div style={{ paddingLeft: '15px' }}>{renderComponent()}</div>
      </div>
    </div>
  );
};

export default ConfigurableComponent;
