import { FC, Fragment } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import moment, { Moment, isMoment } from 'moment';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { HiddenFormItem } from '../../../hiddenFormItem';
import { useForm } from '../../../../providers';

const DATE_TIME_FORMATS = {
  time: 'HH:mm',
  week: 'YYYY-wo',
  date: 'DD/MM/YYYY',
  quarter: 'YYYY-\\QQ',
  month: 'YYYY-MM',
  year: 'YYYY',
};

const { RangePicker } = DatePicker;

type RangeType = 'start' | 'end';
type RangeInfo = {
  range: RangeType;
};

type RangeValue = [moment.Moment, moment.Moment];

type TimePickerChangeEvent = (value: any | null, dateString: string) => void;
type RangePickerChangeEvent = (values: any, formatString: [string, string]) => void;

export interface IDateFieldProps extends IConfigurableFormComponent {
  dateFormat?: string;
  value?: any;
  hideBorder?: boolean;
  showTime?: boolean;
  showNow?: boolean;
  showToday?: boolean;
  timeFormat?: string;
  yearFormat?: string;
  quarterFormat?: string;
  monthFormat?: string;
  weekFormat?: string;
  range?: boolean;
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  onChange?: TimePickerChangeEvent | RangePickerChangeEvent;
}

const getMoment = (value: any, dateFormat: string): Moment => {
  if (value === null || value === undefined) return undefined;

  const values = [isMoment(value) ? value : null, moment(value as string, dateFormat), moment(value as string)];

  const parsed = values.find(i => isMoment(i) && i.isValid());

  return parsed;
};

const settingsForm = settingsFormJson as FormMarkup;

const DateField: IToolboxComponent<IDateFieldProps> = {
  type: 'dateField',
  name: 'Date field',
  icon: <CalendarOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customModel = model as IDateFieldProps;

    return (
      <Fragment>
        <FormItem model={model}>
          <DatePickerWrapper {...customModel} />
        </FormItem>

        {customModel?.range && (
          <Fragment>
            <HiddenFormItem name={`${customModel?.name}Start`} />
            <HiddenFormItem name={`${customModel?.name}End`} />
          </Fragment>
        )}
      </Fragment>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customModel: IDateFieldProps = {
      ...model,
      dateFormat: DATE_TIME_FORMATS?.date,
      timeFormat: DATE_TIME_FORMATS.time,
    };
    return customModel;
  },
};

export const DatePickerWrapper: FC<IDateFieldProps> = props => {
  const {
    name,
    dateFormat = DATE_TIME_FORMATS.date,
    timeFormat = DATE_TIME_FORMATS.time,
    yearFormat = DATE_TIME_FORMATS.year,
    quarterFormat = DATE_TIME_FORMATS.quarter,
    monthFormat = DATE_TIME_FORMATS.month,
    weekFormat = DATE_TIME_FORMATS.week,
    disabled,
    hideBorder,
    range,
    value,
    showTime,
    showNow,
    showToday,
    onChange,
    picker = 'date',
    defaultValue,
    ...rest
  } = props;
  const { form } = useForm();

  console.log('DatePickerWrapper props, form.getFieldsValue(): ', props, form.getFieldsValue());

  const getFormat = () => {
    switch (picker) {
      case 'date':
        return dateFormat;
      case 'year':
        return yearFormat;
      case 'month':
        return monthFormat;
      case 'quarter':
        return quarterFormat;
      case 'time':
        return timeFormat;
      case 'week':
        return weekFormat;
      default:
        return dateFormat;
    }
  };

  const pickerFormat = getFormat();

  const formattedValue = getMoment(value, pickerFormat);

  const getDefaultRangePickerValues = () =>
    Array.isArray(defaultValue) && defaultValue?.length === 2
      ? defaultValue?.map(v => moment(new Date(v), pickerFormat))
      : [null, null];

  const handleDatePickerChange = (value: any | null, dateString: string) => {
    const newValue = isMoment(value) ? value.format() : value;

    (onChange as TimePickerChangeEvent)(newValue, dateString);
  };

  const handleRangePicker = (values: any[], formatString: [string, string]) => {
    (onChange as RangePickerChangeEvent)(values, formatString);
  };

  const onCalendarChange = (values: any[], _formatString: [string, string], info: RangeInfo) => {
    if (info?.range === 'end' && form) {
      form.setFieldsValue({
        [`${name}Start`]: values[0]?.toISOString(),
        [`${name}End`]: values[1]?.toISOString(),
      });
    }
  };

  if (range) {
    return (
      <RangePicker
        onCalendarChange={onCalendarChange}
        onChange={handleRangePicker}
        format={pickerFormat}
        defaultValue={getDefaultRangePickerValues() as RangeValue}
        {...rest}
        picker={picker}
        showTime={showTime}
        // showNow={showNow}
      />
    );
  }

  return (
    <DatePicker
      value={formattedValue}
      onChange={handleDatePickerChange}
      disabled={disabled}
      bordered={!hideBorder}
      showTime={showTime}
      showNow={showNow}
      showToday={showToday}
      showSecond={false}
      {...rest}
    />
  );
};

export default DateField;
