import { FC } from 'react';
import { Button, FormInstance } from 'antd';
import { StopOutlined, SaveOutlined, DeleteFilled } from '@ant-design/icons';
import { useForm } from '../../providers/form';
import React from 'react';

export interface IProps {
  form: FormInstance;
}

export const ComponentPropertiesTitle: FC<IProps> = ({ form }) => {
  const { deleteComponent, selectedComponentId } = useForm();

  const onSaveClick = () => {
    form.submit();
  };

  const onCancelClick = () => {
    form.resetFields();
  };

  const onDeleteClick = () => {
    deleteComponent({ componentId: selectedComponentId });
  };

  return (
    <div className="component-properties-actions">
      Properties
      {selectedComponentId && (
        <div className="action-buttons">
          {// buttons will eb removed a bit later
          false && (
            <>
              <Button
                icon={<SaveOutlined />}
                onClick={onSaveClick}
                size="small"
                title="Save changes"
                type="primary"
              ></Button>
              <Button icon={<StopOutlined />} onClick={onCancelClick} size="small" title="Cancel changes"></Button>
            </>
          )}
          <Button
            icon={<DeleteFilled color="red" />}
            onClick={onDeleteClick}
            size="small"
            danger
            title="Delete component"
          ></Button>
        </div>
      )}
    </div>
  );
};

export default ComponentPropertiesTitle;
