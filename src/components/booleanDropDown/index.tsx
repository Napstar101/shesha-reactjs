import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React, { FC } from 'react';

interface IBooleanDropDownProps extends SelectProps<any> {
  readonly objectItem: any;
  readonly setObjectItem: (objectItem: any) => void;
  readonly itemKey: string;
}

const { Option } = Select;

const optionsArr = ['Yes', 'No'];

export const BooleanDropDown: FC<IBooleanDropDownProps> = ({ objectItem, setObjectItem, itemKey, value, ...rest }) => {
  const handleOnSelect = arg => {
    arg === 1 ? setObjectItem({ ...objectItem, [itemKey]: true }) : setObjectItem({ ...objectItem, [itemKey]: false });
  };

  const options = optionsArr.map((a, index) => (
    <Option value={index + 1} key={index}>
      {a}
    </Option>
  ));

  const selectProps = { ...rest, value: options ? value : null };
  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      showArrow={false}
      notFoundContent={null}
      allowClear={true}
      onSelect={handleOnSelect}
      filterOption={(inputValue, option) => option?.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      {...selectProps}
    >
      {options}
    </Select>
  );
};

export default BooleanDropDown;
