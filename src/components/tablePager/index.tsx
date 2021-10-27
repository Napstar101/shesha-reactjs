import React, { FC } from 'react';
import TablePagerBase from '../tablePagerBase';
import { useDataTable } from '../../providers';

export interface ITablePagerProps {}

export const TablePager: FC<ITablePagerProps> = () => {
  const {
    pageSizeOptions,
    currentPage,
    totalRows,
    selectedPageSize,
    setCurrentPage,
    changePageSize,
    newOrEditableRowData,
  } = useDataTable();

  return (
    <TablePagerBase
      {...{
        pageSizeOptions,
        currentPage,
        totalRows,
        selectedPageSize,
        setCurrentPage,
        changePageSize,
        disabled: !!newOrEditableRowData,
      }}
    />
  );
};

export default TablePager;
