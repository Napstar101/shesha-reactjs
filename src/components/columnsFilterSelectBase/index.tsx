import React, { FC } from 'react';
import { Select } from 'antd';
import { v4 as uuid } from 'uuid';
import { ITableColumn } from '../../providers/dataTable/interfaces';

const { Option } = Select;

interface IColumnsFilterSelectBaseProps {
  columns: ITableColumn[];
  appliedFiltersColumnIds: string[];
  toggleColumnFilter: (ids: string[]) => void;
}

export const ColumnsFilterSelectBase: FC<IColumnsFilterSelectBaseProps> = ({
  columns,
  appliedFiltersColumnIds,
  toggleColumnFilter,
}) => {
  const handleToggleColumnFilter = (values: string[]) => {
    toggleColumnFilter(values); // There will always be one new element
  };

  const filterOption = (inputValue: string, option: any) =>
    (option.props.children as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  return (
    <div className="columns-filter-select">
      <span className="label">Filter by</span>
      <Select
        allowClear
        size="small"
        mode="multiple"
        onChange={handleToggleColumnFilter}
        value={appliedFiltersColumnIds}
        className="columns-filter-selector"
        filterOption={filterOption}
      >
        {columns
          .filter(({ isFilterable }) => isFilterable)
          .map(({ id, header }) => (
            <Option value={id} key={uuid()}>
              {header}
            </Option>
          ))}
      </Select>
    </div>
  );
};

export default ColumnsFilterSelectBase;
