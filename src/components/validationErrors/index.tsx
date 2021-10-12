import React, { FC } from 'react';
import { Alert, AlertProps, notification } from 'antd';
import { IErrorInfo } from '../../interfaces/errorInfo';
import { IAjaxResponseBase } from '../../interfaces/ajaxResponse';
import _ from 'lodash';

export interface IValidationErrorsProps {
  error: IAjaxResponseBase | IErrorInfo | string | boolean;
}

const DEFAULT_ERROR_MSG = 'Sorry, an error has occurred. Please try again later';

const renderAlert = (props: AlertProps) => {
  notification.error({ message: props.message });
  return <Alert className="sha-validation-error-alert" type="error" showIcon {...props} />;
};

/**
 * A component for displaying validation errors
 */
export const ValidationErrors: FC<IValidationErrorsProps> = ({ error }) => {
  if (!error) return null;

  console.log('ValidationErrors error: ', error);

  let errorObj = error as IErrorInfo;

  if (typeof error === 'string') {
    return renderAlert({ message: DEFAULT_ERROR_MSG });
  }

  // IAjaxResponseBase
  if (Object.keys(error).includes('data')) {
    errorObj = error['data']['error'] as IErrorInfo;
  }

  const { code, message, details, validationErrors } = errorObj;

  if (!code && !message && !details && !validationErrors) {
    return renderAlert({ message: DEFAULT_ERROR_MSG });
  }

  if (validationErrors?.length) {
    const violations = (
      <ul>
        {validationErrors?.map((e, i) => (
          <li key={i}>{e.message}</li>
        ))}
      </ul>
    );

    return renderAlert({ message: 'Please correct the errors and try again:', description: violations });
  }

  if (message) {
    // return renderAlert({ message });
  }

  if (details) {
    // return renderAlert({ message: details });
  }

  return renderAlert({ message: DEFAULT_ERROR_MSG });
};

export default ValidationErrors;
