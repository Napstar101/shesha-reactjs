import React, { FC } from 'react';
import { useDataTableStore } from '../../providers';
import ColumnFiltersBase from '../columnFiltersBase';

interface IColumnFiltersProps {}

export const ColumnFilters: FC<IColumnFiltersProps> = () => {
  const {
    columns,
    tableFilterDirty,
    tableFilter,
    appliedFiltersColumnIds,
    changeFilterOption,
    changeFilter,
    toggleColumnFilter,
    applyFilters,
  } = useDataTableStore();
  const currentFilter = (tableFilterDirty || tableFilter || []);
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
      currentFilter={currentFilter}
    />
  );
};

export default ColumnFilters;
