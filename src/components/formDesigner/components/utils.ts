import { FormInstance } from 'antd';
import { DOMAttributes } from 'react';
import { IConfigurableFormComponent } from '../../..';
import { AuthorizationSettingsDto } from '../../../apis/authorizationSettings';

export const onCustomEventsHandler: Function = <FormCustomEvent = any>(
  event: FormCustomEvent,
  customEventAction: string,
  form: FormInstance,
  settings: AuthorizationSettingsDto
) => {
  const eventFunc = new Function('event', 'form', 'settings', customEventAction);

  return eventFunc(event, form, settings);
};

export const customEventHandler = <T = any>(
  model: IConfigurableFormComponent,
  form: FormInstance,
  settings: AuthorizationSettingsDto = {}
): DOMAttributes<T> => ({
  onBlur: event => onCustomEventsHandler(event, model?.onBlurCustom, form, settings),
  onChange: event => onCustomEventsHandler(event, model?.onChangeCustom, form, settings),
  onFocus: event => onCustomEventsHandler(event, model?.onFocusCustom, form, settings),
});
