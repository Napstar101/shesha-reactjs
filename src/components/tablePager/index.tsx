import React, { FC } from 'react';
import TablePagerBase from '../tablePagerBase';
import { useDataTable } from '../../providers';

interface ITablePagerProps {}

export const TablePager: FC<ITablePagerProps> = () => {
  const { pageSizeOptions, currentPage, totalRows, selectedPageSize, setCurrentPage, changePageSize } = useDataTable();

  return (
    <TablePagerBase
      {...{ pageSizeOptions, currentPage, totalRows, selectedPageSize, setCurrentPage, changePageSize }}
    />
  );
};

export default TablePager;
