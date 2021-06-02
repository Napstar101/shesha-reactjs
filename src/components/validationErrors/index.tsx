import React, { FC } from 'react';
import { Alert } from 'antd';
import { IErrorInfo } from '../../interfaces/errorInfo';
import { IAjaxResponseBase } from '../../interfaces/ajaxResponse';
import _ from 'lodash';

export interface IValidationErrorsProps {
  error: IAjaxResponseBase | IErrorInfo | string | boolean;
}

// Hack. Should make ts-transformer-keys work;
const keysOfErrorInfo = ['code', 'message', 'details', 'validationErrors'];
const keysOfIAjaxResponse = ['result', 'targetUrl', 'success', 'error'];

const UNKNOWN_ERROR = 'Sorry an error ocurred while processing your request';

/**
 * A component for displaying validation errors
 */
export const ValidationErrors: FC<IValidationErrorsProps> = ({ error }) => {
  if (!error) return null;

  // something hardcoded for backward compatibility ))
  if (typeof error === 'boolean') {
    return <Alert message={UNKNOWN_ERROR} type="error" showIcon closable />;
  }

  if (typeof error === 'string') {
    return <Alert message={error} type="error" showIcon closable />;
  }

  const renderErrorInfo = ({ message, details, validationErrors }: IErrorInfo) => {
    const msg = message || details || UNKNOWN_ERROR;

    const hasValidationErrors = !!validationErrors?.length;

    const description = hasValidationErrors ? (
      <ul>
        {validationErrors?.map((e, i) => (
          <li key={i}>{e.message}</li>
        ))}
      </ul>
    ) : null;

    return (
      <Alert
        message={hasValidationErrors ? 'Please correct the errors and try again:' : msg}
        description={description}
        type="error"
        showIcon
        closable
      />
    );
  };

  const errorKeys = Object.keys(error);

  const isErrorInfo = _.intersection(errorKeys, keysOfErrorInfo);

  const isAjaxResponse = _.intersection(errorKeys, keysOfIAjaxResponse);

  if (isErrorInfo) {
    return renderErrorInfo(error as IErrorInfo);
  }

  if (isAjaxResponse) {
    return renderErrorInfo((error as IAjaxResponseBase).error);
  }

  return <Alert message={UNKNOWN_ERROR} type="error" showIcon closable />;
};

export default ValidationErrors;
