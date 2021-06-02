import React, { FC } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { useAutocompleteList } from '../../apis/autocomplete';
import classNames from 'classnames';

export interface IAutocompleteResultItem {
  value: string;
  displayText: string;
}

interface IEntityDropdownProps extends SelectProps<any> {
  typeShortAlias: string;
  allowInherited?: boolean;
  selectedValue?: string;
  lazy?: boolean;
}

export const EntityDropdown: FC<IEntityDropdownProps> = ({ selectedValue, typeShortAlias, className, lazy = false, ...rest }) => {
  const { loading, data, refetch } = useAutocompleteList({
    lazy,
    queryParams: { term: '', typeShortAlias, selectedValue },
  });

  const handleSearch = (term: string) => {
    if (term) {
      refetch({
        queryParams: { term, typeShortAlias, selectedValue },
      });
    }
  };

  return (
    <Select
      style={{ width: '100%' }}
      showSearch
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={handleSearch}
      // onSelect={fetchDefaultList}
      allowClear={true}
      placeholder="Type to search"
      loading={loading}
      className={classNames(className, 'sha-entity-dropdown')}
      {...rest}
    >
      {data?.result?.map(d => (
        <Select.Option value={d.value} key={d.value}>
          {d.displayText}
        </Select.Option>
      ))}
    </Select>
  );
};

export default EntityDropdown;
