import React, { FC } from 'react';
import { Select } from 'antd';
import { IMultiPurposePickerProps } from '../../interfaces';

export interface IMultiPurposePicker {
  /** Properties to control the selector */
  items: IMultiPurposePickerProps[];

  /** The class name */
  className?: string;
}

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option value={i.toString(36) + i} key={i.toString(36) + i}>
      {i.toString(36) + i}
    </Option>
  );
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

/**
 * A component to display Multi Purpose Picker.
 */
export const MultiPurposePicker: FC<IMultiPurposePicker> = ({ items }) => {
  return (
    <div>
      {items?.map(({ mode, defaultOpen }) => {
        return (
          <Select
            defaultOpen={defaultOpen}
            mode={mode}
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['Option 1', 'Option 2']}
            onChange={handleChange}
          >
            {children}
          </Select>
        );
      })}
    </div>
  );
};

export default MultiPurposePicker;
