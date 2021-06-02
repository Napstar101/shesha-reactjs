import React, { FC } from 'react';
import { useDataTableStore } from '../../providers';
import ColumnFiltersBase from '../columnFiltersBase';

interface IColumnFiltersProps {}

export const ColumnFilters: FC<IColumnFiltersProps> = () => {
  const {
    columns,
    appliedFiltersColumnIds,
    changeFilterOption,
    changeFilter,
    toggleColumnFilter,
    applyFilters,
  } = useDataTableStore();

  return (
    <ColumnFiltersBase
      {...{
        columns,
        appliedFiltersColumnIds,
        changeFilterOption,
        changeFilter,
        toggleColumnFilter,
        applyFilters,
      }}
    />
  );
};

export default ColumnFilters;
