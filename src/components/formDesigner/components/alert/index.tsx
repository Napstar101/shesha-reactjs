import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { IConfigurableFormComponent } from '../../../../providers/form/models';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../../providers';
import { alertSettingsForm } from './settings';

export interface IAlertProps extends IConfigurableFormComponent {
  text: string;
  description?: string;
  showIcon?: boolean;
  alertType?: 'success' | 'info' | 'warning' | 'error';
}

const AlertComponent: IToolboxComponent<IAlertProps> = {
  type: 'alert',
  name: 'Alert',
  icon: <ExclamationCircleOutlined />,
  factory: (model: IAlertProps) => {
    const { formMode, visibleComponentIds } = useForm();
    const { text, alertType, description, showIcon } = model;

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return (
      <Alert
        message={text}
        type={alertType}
        description={description}
        showIcon={showIcon}
        style={{ marginBottom: 12 }} // Temporary. Make it configurable
      />
    );
  },
  settingsFormMarkup: alertSettingsForm,
  validateSettings: model => validateConfigurableComponentSettings(alertSettingsForm, model),
};

export default AlertComponent;
