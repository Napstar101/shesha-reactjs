import { FC, Fragment } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { ClockCircleOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import moment, { Moment, isMoment } from 'moment';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../../providers';
import { HiddenFormItem } from '../../../hiddenFormItem';

type RangeType = 'start' | 'end';
type RangeInfo = {
  range: RangeType;
};

type RangeValue = [moment.Moment, moment.Moment];

const DATE_TIME_FORMAT = 'HH:mm';

type TimePickerChangeEvent = (value: any | null, dateString: string) => void;
type RangePickerChangeEvent = (values: any, formatString: [string, string]) => void;

export interface ITimePickerProps extends IConfigurableFormComponent {
  className?: string;
  defaultValue?: string | [string, string];
  format?: string;
  value?: string | [string, string];
  placeholder?: string;
  popupClassName?: string;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabled?: boolean; // Use
  range?: boolean; // Use
  allowClear?: boolean;
  autoFocus?: boolean;
  bordered?: boolean;
  inputReadOnly?: boolean;
  showNow?: boolean;
  hideDisabledOptions?: boolean;
  use12Hours?: boolean;
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
      <Fragment>
        <FormItem model={model}>
          <TimePickerWrapper {...customModel} />
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
  placeholder,
  format = DATE_TIME_FORMAT,
  ...rest
}) => {
  const { form } = useForm();
  const evaluatedValue = getMoment(value, format);

  const getDefaultRangePickerValues = () =>
    Array.isArray(defaultValue) && defaultValue?.length === 2
      ? defaultValue?.map(v => moment(new Date(v), format))
      : [null, null];

  const handleTimePickerChange = (value: moment.Moment, dateString: string) => {
    const newValue = isMoment(value) ? value.format(format) : value;

    (onChange as TimePickerChangeEvent)(newValue, dateString);
  };

  const handleRangePicker = (values: any[], formatString: [string, string]) => {
    (onChange as RangePickerChangeEvent)(values, formatString);
  };

  const onCalendarChange = (_values: any[], formatString: [string, string], info: RangeInfo) => {
    if (info?.range === 'end' && form) {
      form.setFieldsValue({
        [`${rest?.name}Start`]: formatString[0],
        [`${rest?.name}End`]: formatString[1],
      });
    }
  };

  if (range) {
    return (
      <TimePicker.RangePicker
        onChange={handleRangePicker}
        onCalendarChange={onCalendarChange}
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
      onChange={handleTimePickerChange}
      format={format}
      defaultValue={defaultValue && moment(defaultValue)}
      // show
      {...rest}
    />
  );
};

export default TimeField;
