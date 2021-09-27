import { FC } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import moment, { Moment, isMoment } from 'moment';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface IDateFieldProps extends IConfigurableFormComponent {
  dateFormat?: string;
  value?: any;
  onChange?: any;
  hideBorder?: boolean;
  showTime?: boolean;
  timeFormat?: string;
}

const getMoment = (value: any, dateFormat: string): Moment => {
  if (value === null || value === undefined) return undefined;

  const values = [isMoment(value) ? value : null, moment(value as string, dateFormat), moment(value as string)];

  const parsed = values.find(i => isMoment(i) && i.isValid());

  return parsed;
};

const DATE_DEFAULT_FORMAT = 'DD/MM/YYYY';
const DATE_TIME_FORMAT = 'HH:mm';

const settingsForm = settingsFormJson as FormMarkup;

const DateField: IToolboxComponent<IDateFieldProps> = {
  type: 'dateField',
  name: 'Date field',
  icon: <CalendarOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customModel = model as IDateFieldProps;

    return (
      <FormItem model={model}>
        <DatePickerWrapper {...customModel} />
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customModel: IDateFieldProps = {
      ...model,
      dateFormat: DATE_DEFAULT_FORMAT,
      timeFormat: DATE_TIME_FORMAT,
    };
    return customModel;
  },
};

export const DatePickerWrapper: FC<IDateFieldProps> = props => {
  const format = props.dateFormat ?? DATE_DEFAULT_FORMAT;
  const value = getMoment(props.value, format);

  const localOnChange = value => {
    const newValue = isMoment(value) ? value.format() : value;

    props.onChange(newValue);
  };

  return (
    <DatePicker
      value={value}
      format={format}
      onChange={localOnChange}
      disabled={props.disabled}
      bordered={!props.hideBorder}
      showTime={props.showTime}
      // show
    />
  );
};

export default DateField;
