import React, { FC } from 'react';
import { Alert, AlertProps } from 'antd';
import { IErrorInfo } from '../../interfaces/errorInfo';
import { IAjaxResponseBase } from '../../interfaces/ajaxResponse';

export interface IValidationErrorsProps {
  error: IAjaxResponseBase | IErrorInfo | string | boolean;
}

const DEFAULT_ERROR_MSG = 'Sorry, an error has occurred. Please try again later';

/**
 * A component for displaying validation errors
 */
export const ValidationErrors: FC<IValidationErrorsProps> = ({ error }) => {
  if (!error) return null;

  const renderAlert = (props: AlertProps) => {
    return <Alert className="sha-validation-error-alert" type="error" showIcon {...props} />;
  };

  let errorObj = error as IErrorInfo;

  if (typeof error === 'string') {
    return renderAlert({ message: DEFAULT_ERROR_MSG });
  }

  // IAjaxResponseBase
  if (Object.keys(error).includes('data')) {
    errorObj = error['data']['error'] as IErrorInfo;
  }

  const { message, details, validationErrors } = errorObj;

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
    return renderAlert({ message });
  }

  if (details) {
    return renderAlert({ message: details });
  }

  return renderAlert({ message: DEFAULT_ERROR_MSG });
};

export default ValidationErrors;
