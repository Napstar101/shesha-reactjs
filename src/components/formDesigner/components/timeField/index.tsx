import { FC } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { ClockCircleOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import moment, { Moment, isMoment } from 'moment';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

type RangeValue = [moment.Moment, moment.Moment];

const DATE_TIME_FORMAT = 'HH:mm';

type TimePickerChangeEvent = (value: any | null, dateString: string) => void;
type RangePickerChangeEvent = (values: any, formatString: [string, string]) => void;

export interface ITimePickerProps extends IConfigurableFormComponent {
  allowClear?: boolean;
  autoFocus?: boolean;
  bordered?: boolean;
  className?: string;
  clearIcon?: string; // Icon picker
  clearText?: string;
  defaultValue?: string | [string, string];
  disabled?: boolean; // Use
  range?: boolean; // Use
  // disabledHours?: boolean;
  // disabledMinutes?: boolean;
  // disabledSeconds?: boolean;
  format?: string;
  value?: string | [string, string];
  hideDisabledOptions?: boolean;
  hourStep?: number;
  inputReadOnly?: boolean;
  minuteStep?: number;
  placeholder?: string;
  popupClassName?: string;
  secondStep?: number;
  showNow?: boolean;
  use12Hours?: boolean;
  startName?: string;
  endName?: string;
  onChange?: TimePickerChangeEvent | RangePickerChangeEvent;
}

const getMoment = (value: any, dateFormat: string): Moment => {
  if (value === null || value === undefined) return undefined;

  const values = [isMoment(value) ? value : null, moment(value as string, dateFormat), moment(value as string)];

  const parsed = values.find(i => isMoment(i) && i.isValid());

  return parsed;
};

const settingsForm = settingsFormJson as FormMarkup;

const TimeField: IToolboxComponent<ITimePickerProps> = {
  type: 'timePicker',
  name: 'Time Picker',
  icon: <ClockCircleOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customModel = model as ITimePickerProps;

    return (
      <FormItem model={model}>
        <TimePickerWrapper {...customModel} />
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customModel: ITimePickerProps = {
      ...model,
      format: DATE_TIME_FORMAT,
    };
    return customModel;
  },
};

export const TimePickerWrapper: FC<ITimePickerProps> = ({
  onChange,
  range,
  value,
  defaultValue,
  startName,
  endName,
  placeholder,
  format = DATE_TIME_FORMAT,
  ...rest
}) => {
  const evaluatedValue = getMoment(value, format);

  const getDefaultRangePickerValues = () =>
    Array.isArray(defaultValue) && defaultValue?.length === 2
      ? defaultValue?.map(v => moment(new Date(v), format))
      : [null, null];

  const handleTimePicker = (value: moment.Moment, dateString: string) => {
    const newValue = isMoment(value) ? value.format() : value;

    (onChange as TimePickerChangeEvent)(newValue, dateString);
  };

  const handleRangePicker = (values: any[], formatString: [string, string]) => {
    (onChange as RangePickerChangeEvent)(values, formatString);
  };

  if (range) {
    return (
      <TimePicker.RangePicker
        onChange={handleRangePicker}
        format={format}
        defaultValue={getDefaultRangePickerValues() as RangeValue}
        {...rest}
        placeholder={null}
      />
    );
  }

  return (
    <TimePicker
      value={evaluatedValue}
      onChange={handleTimePicker}
      format={format}
      defaultValue={moment(defaultValue)}
      {...rest}
    />
  );
};

export default TimeField;
