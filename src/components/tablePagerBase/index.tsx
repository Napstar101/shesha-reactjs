import React, { FC } from 'react';
import { Pagination } from 'antd';

export interface ITablePagerBaseProps {
  /** Whether this component */
  disabled?: boolean;

  /** The options for page sizes */
  pageSizeOptions: number[];

  /** The current page the table is on */
  currentPage: number;

  /** Total number of rows to display on the table */
  totalRows: number;

  /** the selected page size of the table */
  selectedPageSize: number;

  /** A function to set the page the table should be on */
  setCurrentPage: (page: number) => void;

  /** A function to change  */
  changePageSize: (size: number) => void;
}

export const TablePagerBase: FC<ITablePagerBaseProps> = ({
  disabled = false,
  pageSizeOptions,
  currentPage,
  totalRows,
  selectedPageSize,
  setCurrentPage,
  changePageSize,
}) => {
  const onPageNumberChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    changePageSize(pageSize);
  };

  const onShowSizeChange = (current: number, size?: number) => {
    changePageSize(size);
    setCurrentPage(current);
  };

  return (
    <Pagination
      size="small"
      total={totalRows}
      pageSizeOptions={(pageSizeOptions || []).map(s => `${s}`)}
      current={currentPage}
      pageSize={selectedPageSize}
      showSizeChanger
      onChange={onPageNumberChange}
      onShowSizeChange={onShowSizeChange}
      showLessItems
      disabled={disabled}
      showTotal={(total, range) => (total > 0 ? `${range[0]}-${range[1]} of ${total} items` : '0 items found')} // todo: add `filtered from xxx` here if needed
    />
  );
};

export default TablePagerBase;
