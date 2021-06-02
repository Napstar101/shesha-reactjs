import React, { FC, MutableRefObject, Fragment } from 'react';
import { useDataTableStore } from '../../providers';
import { ICrudProps, IDataTableInstance } from '../../providers/dataTable/interfaces';
import IndexTable from '../indexTable';
import { ITableActionColumns, ITableCustomTypeEditor } from '../indexTable/interfaces';
import CollapsiblePanel from '../panel';
import { ChildTableControls } from '../childTableControls';
import IndexTableColumnFilters from '../indexTableColumnFilters';
import IndexTableColumnVisibilityToggle from '../indexTableColumnVisibilityToggle';
import { Alert, Drawer } from 'antd';
import { IToolbarItem } from '../../interfaces';

export interface IChildTableProps extends ICrudProps {
  id: string;
  toolbarItems?: IToolbarItem[];
  header?: string;
  actionColumns?: ITableActionColumns[];
  customTypeEditors?: ITableCustomTypeEditor[];
  tableRef?: MutableRefObject<IDataTableInstance | null>;
  onRowsChanged?: (rows: object[]) => void;
  toolbarItemsPlacement?: 'panelHeader' | 'panelBody';
  alert?: string;
  paginationMode?: 'scroll' | 'pagination';
}

export const ChildDataTable: FC<IChildTableProps> = ({
  id,
  header,
  actionColumns,
  crud,
  saveLocally,
  tableRef,
  crudMode,
  onRowsChanged,
  alert,
  paginationMode = 'scroll',
  customTypeEditors,
  toolbarItems,
}) => {
  const store = useDataTableStore();

  if (tableRef) tableRef.current = store;

  const {
    isInProgress: { isFiltering, isSelectingColumns },
    setIsInProgressFlag,
  } = store;

  const toggleFieldPropertiesSidebar = () =>
    !isSelectingColumns && !isFiltering
      ? setIsInProgressFlag({ isFiltering: true })
      : setIsInProgressFlag({ isFiltering: false, isSelectingColumns: false });

  const renderSidebarContent = () => {
    if (isFiltering) {
      return <IndexTableColumnFilters />;
    }

    if (isSelectingColumns) {
      return <IndexTableColumnVisibilityToggle />;
    }

    return <Fragment />;
  };

  return (
    <div className="sha-child-table">
      <CollapsiblePanel
        header={header}
        extra={
          <div className="sha-child-table-extra">
            <ChildTableControls
              crud={crud}
              showPagination={paginationMode === 'pagination'}
              toolbarItems={toolbarItems}
            />
          </div>
        }
        noContentPadding
        className="sha-child-table-panel"
      >
        {alert && <Alert type="info" message={alert} />}

        <IndexTable
          id={id}
          actionColumns={actionColumns}
          crud={crud}
          saveLocally={saveLocally}
          tableRef={tableRef}
          onRowsChanged={onRowsChanged}
          crudMode={crudMode}
          customTypeEditors={customTypeEditors}
        />
      </CollapsiblePanel>

      <Drawer
        title={`Filter Columns / ${header}`}
        placement="right"
        closable={false}
        onClose={toggleFieldPropertiesSidebar}
        visible={isFiltering || isSelectingColumns}
        // getContainer={false}
        style={{ position: 'absolute' }}
        width={320}
      >
        {renderSidebarContent()}
      </Drawer>
    </div>
  );
};

export default ChildDataTable;
