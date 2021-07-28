import { createAction } from 'redux-actions';
import { DataTableConfigDto } from '../../apis/dataTable';
import { IDataTableStateContext, IDataTableUserConfig, DEFAULT_PAGE_SIZE_OPTIONS } from './contexts';
import {
  IndexColumnFilterOption,
  ITableColumn,
  ITableFilter,
  IStoredFilter,
  ColumnFilter,
  ITableDataResponse,
  IGetDataPayload,
  IndexColumnDataType,
  SortDirection,
  IEditableRowState,
} from './interfaces';

export enum DataTableActionEnums {
  FetchTableConfig = 'FETCH_TABLE_CONFIG',
  FetchTableConfigSuccess = 'FETCH_TABLE_CONFIG_SUCCESS',
  FetchTableConfigError = 'FETCH_TABLE_CONFIG_ERROR',

  FetchTableData = 'FETCH_TABLE_DATA',
  FetchTableDataSuccess = 'FETCH_TABLE_DATA_SUCCESS',
  FetchTableDataError = 'FETCH_TABLE_DATA_ERROR',

  ExportToExcelRequest = 'EXPORT_TO_EXCEL_REQUEST',
  ExportToExcelSuccess = 'EXPORT_TO_EXCEL_SUCCESS',
  ExportToExcelError = 'EXPORT_TO_EXCEL_ERROR',

  ChangePageSize = 'CHANGE_PAGE_SIZE',
  SetCurrentPage = 'SET_CURRENT_PAGE',
  
  ToggleColumnVisibility = 'TOGGLE_COLUMN_VISIBILITY',
  ToggleColumnFilter = 'TOGGLE_COLUMN_FILTER',
  RemoveColumnFilter = 'REMOVE_COLUMN_FILTER',
  ChangeFilterOption = 'CHANGE_FILTER_OPTION',
  ChangeFilter = 'CHANGE_FILTER',
  ApplyFilter = 'APPLY_FILTER',
  ChangeQuickSearch = 'CHANGE_QUICK_SEARCH',
  ToggleSaveFilterModal = 'TOGGLE_SAVE_FILTER_MODAL',
  ChangeSelectedRow = 'CHANGE_SELECTED_ROW',
  ChangeSelectedStoredFilterIds = 'CHANGE_SELECTED_STORED_FILTER_IDS',
  SetPredefinedFilters = 'REGISTER_STORED_FILTER',
  ChangeSelectedIds = 'CHANGE_SELECTED_IDS',
  SetCrudRowData = 'SET_CRUD_ROW_DATA',
  UpdateLocalTableData = 'UPDATE_LOCAL_TABLE_DATA',
  DeleteRowItem = 'DELETE_ROW_ITEM',

  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const fetchTableDataAction = createAction<IDataTableStateContext, IGetDataPayload>(
  DataTableActionEnums.FetchTableData,
  payload => ({
    isFetchingTableData: true,
    tableId: payload.id, // todo: isolate all table properties including id, for now we just pass the id from the fetch aciton
    tableSorting: payload.sorting,
    currentPage: payload.currentPage,
    selectedPageSize: payload.pageSize,
    parentEntityId: payload.parentEntityId,
    selectedStoredFilterIds: payload.selectedStoredFilterIds ?? [],
  })
);

export const fetchTableDataSuccessAction = createAction<IDataTableStateContext, ITableDataResponse>(
  DataTableActionEnums.FetchTableDataSuccess,
  tableData => {
    const { rows, totalPages, totalRows, totalRowsBeforeFilter } = tableData;

    return {
      tableData: rows,
      totalPages,
      totalRows,
      totalRowsBeforeFilter,
      isFetchingTableData: false,
    };
  }
);

export const fetchTableDataErrorAction = createAction<IDataTableStateContext>(
  DataTableActionEnums.FetchTableDataError,
  () => ({
    isFetchingTableData: false,
    hasFetchTableDataError: true,
  })
);

export const fetchTableConfigAction = createAction<IDataTableStateContext, string>(
  DataTableActionEnums.FetchTableConfig,
  tableId => ({ isFetchingTableData: true, tableId })
);

export const setCreateOrEditRowDataAction = createAction<IDataTableStateContext, IEditableRowState>(
  DataTableActionEnums.SetCrudRowData,
  newOrEditableRowData => ({ newOrEditableRowData })
);

export interface IFetchTableConfigSuccessPayload {
  //tableConfig: ITableConfigResponse;
  tableConfig: DataTableConfigDto;
  userConfig: IDataTableUserConfig;
}

export const fetchTableConfigSuccessAction = createAction<IDataTableStateContext, IFetchTableConfigSuccessPayload>(
  DataTableActionEnums.FetchTableConfigSuccess,
  payload => {
    const { tableConfig, userConfig } = payload;
    const { columns, storedFilters, createUrl, updateUrl, deleteUrl, detailsUrl } = tableConfig;

    const cols = columns.map<ITableColumn>(column => {
      const userColumn = userConfig?.columns?.find(c => c.id === column.name);

      const colVisibility =
        userColumn?.show === null || userColumn?.show === undefined ? !column.isHiddenByDefault : userColumn?.show;

      return {
        id: column.name,
        columnId: column.name,
        caption: column.caption,
        accessor: column.name,
        propertyName: column.propertyName,
        header: column.caption,
        isVisible: column.isVisible,
        isSortable: column.isSortable,
        isHiddenByDefault: column.isHiddenByDefault,
        isFilterable: column.isFilterable,
        width: column.width,
        entityReferenceTypeShortAlias: column.entityReferenceTypeShortAlias,
        referenceListName: column.referenceListName,
        referenceListNamespace: column.referenceListNamespace,
        autocompleteUrl: column.autocompleteUrl,
        allowInherited: column.allowInherited,
        dataType: column.dataType as IndexColumnDataType,
        defaultSorting: column.defaultSorting as SortDirection,

        filterOption: userColumn?.filterOption,
        filter: userColumn?.filter,
        allowFilter: userConfig?.appliedFiltersColumnIds?.includes(column.name),
        show: column.isVisible && colVisibility,
      };
    });

    const mergedConfig: IDataTableStateContext = {
      isFetchingTableData: false,
      tableConfigLoaded: true,
      columns: cols,
      currentPage: userConfig?.currentPage || 1,
      selectedPageSize: userConfig?.pageSize || DEFAULT_PAGE_SIZE_OPTIONS[1],
      quickSearch: userConfig?.quickSearch,
      tableFilter: userConfig?.tableFilter,
      selectedStoredFilterIds: userConfig?.selectedStoredFilterIds || [],
      storedFilters: storedFilters
        ?.filter(f => Boolean(f.id))
        .map<IStoredFilter>(filter => ({ ...filter })),
      tableSorting: userConfig?.tableSorting,
      appliedFiltersColumnIds: userConfig?.appliedFiltersColumnIds || [],
      crudConfig: {
        createUrl,
        updateUrl,
        deleteUrl,
        detailsUrl,
      },
    };

    return mergedConfig;
  }
);

export const fetchTableConfigErrorAction = createAction<IDataTableStateContext, boolean>(
  DataTableActionEnums.FetchTableConfigError,
  hasFetchTableDataError => ({
    isFetchingTableData: false,
    hasFetchTableDataError,
  })
);

export const changePageSizeAction = createAction<IDataTableStateContext, number>(
  DataTableActionEnums.ChangePageSize,
  selectedPageSize => ({
    selectedPageSize,
  })
);

export const changeQuickSearchAction = createAction<IDataTableStateContext, string>(
  DataTableActionEnums.ChangeQuickSearch,
  quickSearch => ({
    quickSearch,
  })
);

export const toggleSaveFilterModalAction = createAction<IDataTableStateContext, boolean>(
  DataTableActionEnums.ToggleSaveFilterModal,
  payload => ({
    saveFilterModalVisible: payload,
  })
);

export const setCurrentPageAction = createAction<IDataTableStateContext, number>(
  DataTableActionEnums.SetCurrentPage,
  currentPage => ({
    currentPage,
  })
);

export const toggleColumnVisibilityAction = createAction<IDataTableStateContext, string>(
  DataTableActionEnums.ToggleColumnVisibility,
  columnIdToToggle => ({
    columnIdToToggle,
  })
);

export const toggleColumnFilterAction = createAction<IDataTableStateContext, string[]>(
  DataTableActionEnums.ToggleColumnFilter,
  appliedFiltersColumnIds => ({
    appliedFiltersColumnIds,
  })
);

export const removeColumnFilterAction = createAction<IDataTableStateContext, string>(
  DataTableActionEnums.RemoveColumnFilter,
  columnIdToRemoveFromFilter => ({
    columnIdToRemoveFromFilter,
  })
);

export const changeFilterOptionAction = createAction<IDataTableStateContext, string, IndexColumnFilterOption>(
  DataTableActionEnums.ChangeFilterOption,
  (filterColumnId, filterOptionValue) => ({
    filterColumnId,
    filterOptionValue,
  })
);

export const changeFilterAction = createAction<IDataTableStateContext, string, ColumnFilter>(
  DataTableActionEnums.ChangeFilter,
  (filterColumnId, filterValue) => ({
    filterColumnId,
    filterValue,
  })
);

export const applyFilterAction = createAction<IDataTableStateContext, ITableFilter[]>(
  DataTableActionEnums.ApplyFilter,
  tableFilter => ({
    tableFilter,
    currentPage: 1,
  })
);

export const changeSelectedRowAction = createAction<IDataTableStateContext, number>(
  DataTableActionEnums.ChangeSelectedRow,
  selectedRow => ({
    selectedRow,
  })
);

export const changeSelectedStoredFilterIdsAction = createAction<IDataTableStateContext, string[]>(
  DataTableActionEnums.ChangeSelectedStoredFilterIds,
  selectedStoredFilterIds => ({
    selectedStoredFilterIds,
  })
);

export const setPredefinedFiltersAction = createAction<IStoredFilter[], IStoredFilter[]>(
  DataTableActionEnums.SetPredefinedFilters,
  p => p
);

export const changeSelectedIdsAction = createAction<IDataTableStateContext, string[]>(
  DataTableActionEnums.ChangeSelectedIds,
  selectedIds => ({
    selectedIds,
  })
);

export const exportToExcelRequestAction = createAction<IDataTableStateContext>(
  DataTableActionEnums.ExportToExcelRequest,
  () => ({})
);
export const exportToExcelSuccessAction = createAction<IDataTableStateContext>(
  DataTableActionEnums.ExportToExcelSuccess,
  () => ({})
);
export const exportToExcelErrorAction = createAction<IDataTableStateContext>(
  DataTableActionEnums.ExportToExcelError,
  () => ({})
);

export interface IInitTableConfigProps {
  columns?: ITableColumn[];
  tableFilter?: ITableFilter[];
  appliedFiltersColumnIds?: string[];
  storedFilters?: IStoredFilter[];
  selectedPageSize?: number;
  currentPage?: number;
}

export const updateLocalTableDataAction = createAction<IDataTableStateContext>(
  DataTableActionEnums.UpdateLocalTableData,
  () => ({})
);

export const deleteRowItemAction = createAction<IDataTableStateContext, string>(
  DataTableActionEnums.DeleteRowItem,
  idOfItemToDeleteOrUpdate => ({ idOfItemToDeleteOrUpdate })
);

/* NEW_ACTION_GOES_HERE */
