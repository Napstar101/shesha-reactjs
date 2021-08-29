import React, { FC } from 'react';
import { DownloadOutlined, FilterOutlined, PlusOutlined, ReloadOutlined, SlidersOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDataTable } from '../../providers';
import GlobalTableFilter from '../globalTableFilter';
import TablePager from '../tablePager';
import { IToolbarItem } from '../../interfaces/toolbar';
import { v4 as uuid } from 'uuid';
import { ICrudState } from '../../providers/dataTable/interfaces';

export interface IChildTableControlsProps {
  header?: string;
  showRefreshBtn?: boolean;
  showPagination?: boolean;
  crud?: boolean | ICrudState;
  toolbarItems?: IToolbarItem[];
}

export const ChildTableControls: FC<IChildTableControlsProps> = ({
  header,
  showPagination = false,
  crud,
  toolbarItems,
}) => {
  
  const {
    isInProgress: { isFiltering, isSelectingColumns, exportToExcel: isExportingToExcel },
    setIsInProgressFlag,
    refreshTable,
    isFetchingTableData,
    setCrudRowData,
    exportToExcel,
    newOrEditableRowData,
  } = useDataTable();

  const startFilteringColumns = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsInProgressFlag({ isFiltering: true, isSelectingColumns: false });
  };

  const startTogglingColumnVisibility = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsInProgressFlag({ isSelectingColumns: true, isFiltering: false });
  };

  const startAddData = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setCrudRowData();
  };

  const handleRefreshData = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    refreshTable();
  };

  const handleExportToExcel = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    exportToExcel();
  };

  return (
    <div className="sha-child-table-controls">
      <div className="index-table-controls-left">
        <div className="index-view-selector">
          <h1 className="title">{header}</h1>
        </div>
      </div>

      <div className="index-table-controls-right">
        <GlobalTableFilter />

        {(typeof crud === 'boolean' && crud|| (crud as ICrudState)?.create) && (
          <Button
            type="link"
            disabled={Boolean(newOrEditableRowData?.id)}
            onClick={startAddData}
            className="extra-btn"
            icon={<PlusOutlined />}
            size="small"
          >
            Add
          </Button>
        )}

        {toolbarItems
          ?.filter(({ hide }) => !hide)
          ?.map(({ className, title, icon, onClick, disabled }) => (
            <Button
              type="link"
              key={uuid()}
              disabled={disabled}
              onClick={event => {
                event?.stopPropagation();
                onClick(event);
              }}
              className={'extra-btn' + className && ` ${className}`}
              icon={icon}
              size="small"
            >
              {title}
            </Button>
          ))}

        <Button
          type="link"
          disabled={isExportingToExcel}
          onClick={handleExportToExcel}
          className="extra-btn"
          icon={<DownloadOutlined />}
          size="small"
        >
          Export
        </Button>

        <Button
          type="link"
          disabled={!!isFiltering}
          onClick={startFilteringColumns}
          className="extra-btn filter"
          icon={<FilterOutlined />}
          size="small"
        />

        <Button
          type="link"
          className="extra-btn column-visibility"
          icon={<SlidersOutlined rotate={90} />}
          disabled={!!isSelectingColumns}
          onClick={startTogglingColumnVisibility}
          size="small"
        />

        {showPagination && <TablePager />}

        <Button
          type="link"
          disabled={isFetchingTableData ?? false}
          onClick={handleRefreshData}
          className="extra-btn reload"
          icon={<ReloadOutlined />}
          size="small"
        />
      </div>
    </div>
  );
};

export default ChildTableControls;
