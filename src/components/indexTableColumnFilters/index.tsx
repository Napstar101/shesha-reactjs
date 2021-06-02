import React, { FC } from 'react';
import { Divider } from 'antd';
import ColumnFilters from '../columnFilters';
import ColumnsFilterSelect from '../columnsFilterSelect';
import ColumnFiltersButtons from '../columnFiltersButtons';
import { useDataTableStore } from '../../providers';

interface ISimpleIndexTableColumnFiltersProps {}

export const IndexTableColumnFilters: FC<ISimpleIndexTableColumnFiltersProps> = () => {
  const { appliedFiltersColumnIds } = useDataTableStore();
  return (
    <div className="sha-index-table-column-filters">
      <ColumnsFilterSelect />

      {appliedFiltersColumnIds.length > 0 && <Divider />}

      <ColumnFilters />

      <Divider />

      <ColumnFiltersButtons />
    </div>
  );
};

export default IndexTableColumnFilters;
