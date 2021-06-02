import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
  CellPropGetter,
  TableHeaderProps,
  TableCellProps,
  useSortBy,
  usePagination,
  Row,
  // TableToggleAllRowsSelectedProps,
  useTable,
  useBlockLayout,
} from 'react-table';
import { LoadingOutlined } from '@ant-design/icons';
import { Empty, Spin } from 'antd';
import _ from 'lodash';
import { IReactTableProps } from './interfaces';

const cellProps: CellPropGetter<object> = (props, { cell }) => getStyles(props, cell.column.align);

const getStyles = (props: Partial<TableHeaderProps | TableCellProps>, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
];

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }: any, ref) => {
  const defaultRef = useRef();
  let resolvedRef = ref || defaultRef;

  useEffect(() => {
    // @ts-ignore
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
});

const ReactTable: FC<IReactTableProps> = ({
  columns = [],
  data = [],
  useMultiSelect = false,
  loading = false,
  defaultSorting = [],
  defaultCanSort = false,
  manualPagination = true,
  manualFilters,
  selectedRowIndex,
  defaultColumn,
  // changeSelectedIds,
  disableSortBy = false,
  pageCount,
  scroll = false,
  height,
  ref,
  onFetchData,
  onSelectRow,
  onRowDoubleClick,
  onResizedChange,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        sortBy: defaultSorting || [],
        hiddenColumns: columns
          .map((column: any) => {
            if (column.isVisible === false) return column.accessor || column.id;
          })
          ?.filter(Boolean),
      },
      defaultCanSort,
      manualFilters,
      manualPagination,
      disableSortBy,
      pageCount: pageCount,
    },
    // useBlockLayout,
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination,
    useRowSelect,
    useBlockLayout,
    ({ useInstanceBeforeDimensions, allColumns }) => {
      // console.log('allColumns: ', allColumns);
      if (useMultiSelect) {
        allColumns.push(columns => [
          // Let's make a column for selection
          {
            accessor: 'selection',
            id: 'selection',
            disableResizing: true,
            minWidth: 35,
            width: 35,
            maxWidth: 35,
            disableSortBy: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
      useInstanceBeforeDimensions.push(({ headerGroups }) => {
        // fix the parent group of the selection button to not be resizable
        const selectionGroupHeader = headerGroups[0]?.headers[0];

        if (selectionGroupHeader) {
          selectionGroupHeader.canResize = false;
        }
      });
    }
  );

  const { pageIndex, pageSize, columnResizing } = state;

  useEffect(() => {
    if (ref) {
      ref.current = state;
    }
  }, [state]);

  useEffect(() => {}, [columnResizing]);

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    if (onFetchData) {
      // onFetchData();
    }
  }, [onFetchData, pageIndex, pageSize]);

  const onResizeClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event?.stopPropagation();

  const handleSelectRow = (row: Row<object>) => {
    if (onSelectRow) {
      if (row?.index === selectedRowIndex) {
        onSelectRow(null, null);
      } else onSelectRow(row?.index, row?.original);
    }
  };

  useEffect(() => {
    if (onResizedChange) {
      onResizedChange(state?.columnResizing);
    }
  }, [state?.columnResizing]);

  const handleDoubleClickRow = (row: Row<object>) => {
    if (onRowDoubleClick) {
      onRowDoubleClick(row?.original);
    }
  };

  return (
    <Spin
      spinning={loading}
      indicator={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <LoadingOutlined style={{ fontSize: 24 }} spin />{' '}
          <span style={{ marginLeft: 12, fontSize: 14, color: 'black' }}>loading...</span>
        </span>
      }
    >
      <div className="sha-react-table">
        <div {...getTableProps()} className={classNames('sha-table')}>
          <div>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className={classNames('tr tr-head')}>
                {headerGroup?.headers?.map(column => {
                  return (
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      // {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={classNames('th', {
                        'sorted-asc': column.isSorted && column.isSortedDesc,
                        'sorted-desc': column.isSorted && !column.isSortedDesc,
                      })}
                    >
                      {column.render('Header')}

                      {/* Use column.getResizerProps to hook up the events correctly */}

                      {column?.canResize && (
                        <div
                          {...column.getResizerProps()}
                          // {...column.getResizerProps()}
                          className={classNames('resizer', { isResizing: column.isResizing })}
                          onClick={onResizeClick}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div
            className={classNames('tbody', { scroll })}
            style={{ height: (scroll ? height : 250) ?? height }}
            {...getTableBodyProps()}
          >
            {rows?.length === 0 && !loading && (
              <div className="sha-table-empty">
                <Empty description="There is no data for this table" />
              </div>
            )}

            {rows.map((row, index) => {
              prepareRow(row);

              return (
                <div
                  onClick={() => handleSelectRow(row)}
                  onDoubleClick={() => handleDoubleClickRow(row)}
                  {...row.getRowProps()}
                  className={classNames(
                    'tr tr-body',
                    { 'tr-odd': index % 2 === 0 },
                    { 'sha-tr-selected': selectedRowIndex === row?.index }
                  )}
                >
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps(cellProps)} className="td">
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ReactTable;
