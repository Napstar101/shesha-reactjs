import { createContext } from 'react';
import { IFlagsSetters, IFlagsState } from '../../interfaces';
import { IConfigurableColumnsBase } from '../datatableColumnsConfigurator/models';
import {
  ITableColumn,
  IStoredFilter,
  IQuickFilter,
  ITableFilter,
  IColumnSorting,
  IndexColumnFilterOption,
  ColumnFilter,
  IGetDataPayload,
  ITableCrudConfig,
  IEditableRowState,
} from './interfaces';

export type IFlagProgressFlags =
  | 'isFiltering'
  | 'isSelectingColumns'
  | 'exportToExcel' /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags = 'exportToExcel' /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags = 'exportToExcel' /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags = '__DEFAULT__' /* NEW_ACTIONED_FLAG_GOES_HERE */;

export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 40, 50, 100];

export interface IDataTableUserConfig {
  pageSize: number;
  currentPage: number;
  quickSearch: string;

  columns?: ITableColumn[];
  tableSorting: IColumnSorting[];

  selectedStoredFilterIds?: string[];
  tableFilter?: ITableFilter[];
  appliedFiltersColumnIds?: string[];
}

export const DEFAULT_DT_USER_CONFIG: IDataTableUserConfig = {
  pageSize: DEFAULT_PAGE_SIZE_OPTIONS[1],
  currentPage: 1,
  quickSearch: '',
  tableSorting: undefined,
};

export interface IDataTableStoredConfig extends IGetDataPayload {
  columns?: ITableColumn[];
  tableFilter?: ITableFilter[];
  appliedFiltersColumnIds?: string[];
  // stored filters must also be restored from the local storage after page refresh or navigating away.
  // Selected filters are in IGetDataPayload so we just need to add the filters list
  storedFilters?: IStoredFilter[];
}

export interface IDataTableStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  title?: string;
  hiddenColumns?: string[];
  tableId?: string; // todo: move all table-specific properties to a separate sub-store
  entityType?: string;
  columns?: ITableColumn[];
  // this one is a prop, not state
  storedFilters?: IStoredFilter[];
  predefinedFilters?: IStoredFilter[];
  tableData?: object[];
  filteredColumns?: ITableColumn[];
  isFetchingTableData?: boolean;
  hasFetchTableDataError?: boolean;
  columnIdToToggle?: string;
  quickSearch?: string;
  pageSizeOptions?: number[];
  selectedPageSize?: number;
  currentPage?: number;
  totalPages?: number;
  totalRows?: number;
  totalRowsBeforeFilter?: number;
  quickFilters?: IQuickFilter[];
  appliedFiltersColumnIds?: string[];
  hasUnappliedChanges?: boolean;
  showSaveFilterModal?: boolean;
  tableConfigLoaded?: boolean;
  tableSorting?: IColumnSorting[];
  tableFilter?: ITableFilter[];
  parentEntityId?: string;
  onDblClick?: (...params: any[]) => void;
  onSelectRow?: (index: number, row: any) => void;
  selectedRow?: number;
  dataStamp?: number;
  saveFilterModalVisible?: boolean;
  selectedStoredFilters?: IStoredFilter[];
  selectedStoredFilterIds?: string[],

  /** Configurable columns */
  configurableColumns?: IConfigurableColumnsBase[],

  /**
   * The following fields will not be persisted in the redux store
   */
  columnIdToRemoveFromFilter?: string;
  filterColumnId?: string;
  filterOptionValue?: IndexColumnFilterOption;
  filterValue?: ColumnFilter;
  quickFilterIdToToggle?: string;
  filterName?: string;
  selectedIds?: string[];
  crudConfig?: ITableCrudConfig;
  newOrEditableRowData?: IEditableRowState;
}

export interface IPublicDataTableActions {
  refreshTable: () => void;
  exportToExcel?: () => void;
  setCrudRowData: (newOrEditableRowData?: IEditableRowState) => void;
  cancelCreateOrEditRowData: () => void;
}

export interface IDataTableActionsContext
  extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags>,
    IPublicDataTableActions {
  fetchTableData?: (payload: IGetDataPayload) => void;
  fetchTableConfig?: (id: string) => void;
  toggleColumnVisibility?: (val: string) => void;
  setCurrentPage?: (page: number) => void;
  changePageSize?: (size: number) => void;
  toggleColumnFilter?: (ids: string[]) => void;
  removeColumnFilter?: (columnIdToRemoveFromFilter: string) => void;
  changeFilterOption?: (filterColumnId: string, filterOptionValue: IndexColumnFilterOption) => void;
  changeFilter?: (filterColumnId: string, filterValue: ColumnFilter) => void;
  applyFilters?: () => void;
  clearFilters?: () => void; // to be removed
  getDataPayload?: () => IGetDataPayload;
  /** change quick search text without refreshing of the table data */
  changeQuickSearch?: (val: string) => void;
  /** change quick search and refresh table data */
  performQuickSearch?: (val: string) => void;
  toggleSaveFilterModal?: (visible: boolean) => void;
  changeSelectedRow?: (index: number) => void;

  changeSelectedStoredFilterIds?: (selectedStoredFilterIds: string[]) => void;
  setPredefinedFilters: (filters: IStoredFilter[]) => void;

  changeSelectedIds?: (selectedIds: string[]) => void;
  updateLocalTableData?: () => void;
  deleteRowItem?: (idOfItemToDeleteOrUpdate: string) => void;

  /**
   * Register columns in the table context. Is used for configurable tables
   */
  registerConfigurableColumns?: (ownerId: string, columns: IConfigurableColumnsBase[]) => void;
  /* NEW_ACTION_ACTION_DECLARATIO_GOES_HERE */
}

export const DATA_TABLE_CONTEXT_INITIAL_STATE: IDataTableStateContext = {
  succeeded: {},
  isInProgress: {},
  error: {},
  actioned: {},
  hiddenColumns: [],
  tableId: null,
  columns: [],
  storedFilters: [],
  tableData: [],
  filteredColumns: [],
  isFetchingTableData: false,
  hasFetchTableDataError: null,
  columnIdToToggle: null,
  pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
  selectedPageSize: DEFAULT_PAGE_SIZE_OPTIONS[1],
  currentPage: 1,
  totalPages: -1,
  totalRows: null,
  totalRowsBeforeFilter: null,
  quickFilters: [],
  appliedFiltersColumnIds: [],
  hasUnappliedChanges: null,
  quickSearch: null,
  showSaveFilterModal: null,
  tableConfigLoaded: false,
  tableSorting: [],
  tableFilter: [],
  parentEntityId: null,
  saveFilterModalVisible: false,
  selectedStoredFilters: [],
  selectedIds: [],
  configurableColumns: [],
};

export interface DataTableFullInstance extends IDataTableStateContext, IDataTableActionsContext {}

export const DataTableStateContext = createContext<IDataTableStateContext>(DATA_TABLE_CONTEXT_INITIAL_STATE);

export const DataTableActionsContext = createContext<IDataTableActionsContext>(undefined);
