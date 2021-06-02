import React, { FC } from 'react';
import { useDataTable } from '../../providers';
import ColumnsFilterSelectBase from '../columnsFilterSelectBase';

interface IColumnsFilterSelectProps {}

export const ColumnsFilterSelect: FC<IColumnsFilterSelectProps> = () => {
  const { columns, appliedFiltersColumnIds, toggleColumnFilter } = useDataTable();

  return <ColumnsFilterSelectBase {...{ columns, appliedFiltersColumnIds, toggleColumnFilter }} />;
};

export default ColumnsFilterSelect;
