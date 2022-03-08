import { FormInstance } from 'antd';
import { DOMAttributes } from 'react';
import { IConfigurableFormComponent } from '../../..';

export const onCustomEventsHandler = <FormCustomEvent = any>(
  event: FormCustomEvent,
  customEventAction: string,
  form: FormInstance
) => {
  /* tslint:disable:function-constructor */
  const eventFunc = new Function('event', 'form', customEventAction);

  return eventFunc(event, form);
};

export const customEventHandler = <T = any>(
  model: IConfigurableFormComponent,
  form: FormInstance
): DOMAttributes<T> => ({
  onBlur: event => onCustomEventsHandler(event, model?.onBlurCustom, form),
  onChange: event => onCustomEventsHandler(event, model?.onChangeCustom, form),
  onFocus: event => onCustomEventsHandler(event, model?.onFocusCustom, form),
});
