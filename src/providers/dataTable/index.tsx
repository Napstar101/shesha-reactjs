import React, { FC, useContext, PropsWithChildren, useEffect, useRef } from 'react';
import useThunkReducer from 'react-hook-thunk-reducer';
import { dataTableReducer } from './reducer';
import axios from 'axios';
import FileSaver from 'file-saver';
import {
  DataTableActionsContext,
  DataTableStateContext,
  DATA_TABLE_CONTEXT_INITIAL_STATE,
  IDataTableStateContext,
  IDataTableUserConfig,
  DEFAULT_DT_USER_CONFIG,
} from './contexts';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  fetchTableConfigAction,
  fetchTableConfigSuccessAction,
  fetchTableDataAction,
  fetchTableDataSuccessAction,
  fetchTableDataErrorAction,
  setCurrentPageAction,
  changePageSizeAction,
  toggleColumnVisibilityAction,
  toggleColumnFilterAction,
  changeFilterOptionAction,
  changeFilterAction,
  applyFilterAction,
  changeQuickSearchAction,
  toggleSaveFilterModalAction,
  exportToExcelRequestAction,
  exportToExcelSuccessAction,
  exportToExcelErrorAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
  changeSelectedRowAction,
  changeSelectedStoredFilterIdsAction,
  setPredefinedFiltersAction,
  changeSelectedIdsAction,
  setCreateOrEditRowDataAction,
  updateLocalTableDataAction,
  deleteRowItemAction,
  registerConfigurableColumnsAction,
  fetchColumnsSuccessSuccessAction,
} from './actions';
import {
  ITableDataResponse,
  IndexColumnFilterOption,
  IGetDataPayload,
  ColumnFilter,
  IFilterItem,
  ITableFilter,
  IEditableRowState,
  ICrudProps,
  IStoredFilter,
} from './interfaces';
import { useMutate } from 'restful-react';
import _ from 'lodash';
import { GetColumnsInput, DataTableColumnDtoListAjaxResponse } from '../../apis/dataTable';
import { IResult } from '../../interfaces/result';
import { useLocalStorage } from '../../hooks';
import { useAuth } from '../auth';
import { nanoid } from 'nanoid';
import { useDebouncedCallback } from 'use-debounce';
import { useGet } from 'restful-react';
import { IConfigurableColumnsBase, IConfigurableColumnsProps, IDataColumnsProps } from '../datatableColumnsConfigurator/models';
import { useSheshaApplication } from '../sheshaApplication';

interface IDataTableProviderProps extends ICrudProps {
  tableId?: string;
  entityType?: string;
  title?: string;
  parentEntityId?: string;
  /**
   * @deprecated pass this on an `IndexTable` level
   */
  onDblClick?: (data: any) => void;

  /**
   * @deprecated pass this on an `IndexTable` level
   */
  onSelectRow?: (index: number, row: any) => void;

  /**
   * @deprecated pass this on an `IndexTable` level
   */
  selectedRow?: any;
  dataStamp?: number;
  getDataPath?: string;
  getExportToExcelPath?: string;
  defaultFilter?: IFilterItem[];
}

const DataTableProvider: FC<PropsWithChildren<IDataTableProviderProps>> = ({
  children,
  tableId,
  title,
  parentEntityId,
  onDblClick,
  onSelectRow,
  selectedRow,
  dataStamp,
  getDataPath,
  getExportToExcelPath,
  defaultFilter,
  entityType,
}) => {
  const [state, dispatch] = useThunkReducer(dataTableReducer, {
    ...DATA_TABLE_CONTEXT_INITIAL_STATE,
    tableId: tableId,
    entityType: entityType,
    title: title,
    parentEntityId: parentEntityId,
  });

  const { backendUrl } = useSheshaApplication();
  const tableIsReady = useRef(false);
  const { headers } = useAuth();

  const { mutate: fetchDataTableDataInternal } = useMutate<IResult<ITableDataResponse>>({
    verb: 'POST',
    path: getDataPath ?? '/api/DataTable/GetData',
    requestOptions: {
      headers,
    },
  });

  const fetchDataTableData = (payload: IGetDataPayload) => {
    // save current user configuration to local storage
    const userConfigToSave = {
      pageSize: payload.pageSize,
      currentPage: payload.currentPage,
      quickSearch: payload.quickSearch,
      columns: state.columns,
      tableSorting: payload.sorting,

      selectedStoredFilterIds: payload.selectedStoredFilterIds,
      tableFilter: payload.filter,
      appliedFiltersColumnIds: state.appliedFiltersColumnIds,
    };
    setUserDTSettings(userConfigToSave);

    // convert filters
    const allFilters = [...(state.predefinedFilters || []), ...(state.selectedStoredFilters || [])];
    const filters = payload.selectedStoredFilterIds
      .map(id => allFilters.find(f => f.id === id))
      .filter(f => Boolean(f));
    const expandedPayload: IGetDataPayload = { ...payload, selectedFilters: filters };

    return fetchDataTableDataInternal(expandedPayload);
  };

  const { loading: isFetchingTableConfig, data: tableConfig, refetch: fetTableConfig } = useGet({
    lazy: true,
    queryParams: {
      id: tableId,
    },
    requestOptions: {
      headers,
    },
    path: '/api/DataTable/GetConfiguration',
  });

  const [userDTSettings, setUserDTSettings] = useLocalStorage<IDataTableUserConfig>(tableId, null);

  // refresh table data on change of the `dataStamp` property
  useEffect(() => {
    if (dataStamp) {
      refreshTable();
    }
  }, [dataStamp]);

  const configIsReady = tableId &&
    !isFetchingTableConfig &&
    state.tableConfigLoaded &&
    tableConfig &&
    (state?.columns?.length || 0) > 0;

  // fetch table data when config is ready or something changed (selected filter, changed current page etc.)
  useEffect(() => {
    console.log({
      tableId,
      entityType,
      configIsReady,
      columnsAreReady,
      tableIsReady: tableIsReady.current,
      columns: state.columns,
    });

    if (tableId){
      // fetch using table config
      if (configIsReady) {
        tableIsReady.current = true; // is used to prevent unneeded data fetch by the ReactTable. Any data fetch requests before this line should be skipped
        refreshTable();
      }
    } else
    if (entityType) {
      console.log('refreshTable on changes');
      // fecth using entity type
      tableIsReady.current = true; // is used to prevent unneeded data fetch by the ReactTable. Any data fetch requests before this line should be skipped
      refreshTable();
    }
  }, [
    state.appliedFiltersColumnIds,
    state.tableFilter,
    state.currentPage,
    state.selectedStoredFilterIds,
    state.selectedPageSize,
    isFetchingTableConfig,
    state.tableConfigLoaded,
    state.entityType,
    state.columns,
  ]);

  const refreshTable = () => {
    if ((configIsReady || columnsAreReady) && tableIsReady.current === true) {
      fetchTableData();
    }
  };

  const debouncedFetch = useDebouncedCallback(
    (payload: any) => {
      fetchDataTableData(payload)
        .then(data => dispatch(fetchTableDataSuccessAction(data.result)))
        .catch(e => {
          console.log(e);
          dispatch(fetchTableDataErrorAction());
        });
    },
    // delay in ms
    300
  );

  const columnsAreReady = !tableId &&
    entityType &&
    state?.columns?.length > 0;

  const fetchTableData = (payload?: IGetDataPayload) => {
    const internalPayload = {
      ...getFetchTableDataPayload(),
      ...(payload ?? {}),
      parentEntityId,
    };

    // note: we have two sources of the payload - ReactTable and our provider
    // so we have to save the payload on every fetch request but skip data fetch in some cases
    dispatch(fetchTableDataAction(internalPayload)); // todo: remove this line, it's needed just to save the Id

    if ((configIsReady || columnsAreReady) &&
      tableIsReady.current === true) {
        console.log('debouncedFetch');
      debouncedFetch(internalPayload);
    }
  };

  // fetch table data when configuration is available
  useEffect(() => {
    if (!isFetchingTableConfig && tableConfig) {
      let dtSettings = userDTSettings;

      if (defaultFilter) {
        setUserDTSettings(null);

        dtSettings = {
          ...DEFAULT_DT_USER_CONFIG,
          tableFilter: defaultFilter,
          appliedFiltersColumnIds: defaultFilter?.map(({ columnId }) => columnId) || [],
        };
      }
      dispatch(fetchTableConfigSuccessAction({ tableConfig: tableConfig.result, userConfig: dtSettings }));

      //#region HACK - the value is not populated. I need to investigate why and remove this manual setting
      defaultFilter?.forEach(element => {
        changeFilter(element?.columnId, element?.filter);
      });
      //#endregion
    }
  }, [isFetchingTableConfig, tableConfig]);

  // fetch table config on first render
  useEffect(() => {
    if (tableId)
      fetTableConfig();
  }, [tableId]);

  useEffect(() => {
    // Save the settings whenever the columns change
    if (!_.isEmpty(userDTSettings) && state?.columns?.length > 0) {
      setUserDTSettings({
        ...userDTSettings,
        columns: state?.columns,
      });
    }
  }, [state?.columns]);

  const getFetchTableDataPayloadInternal = (localState: IDataTableStateContext): IGetDataPayload => {
    // Add default filter to table filter
    const filter = localState?.tableFilter || [];

    const properties = getDataProperties(localState.configurableColumns);

    const payload: IGetDataPayload = {
      id: tableId,
      entityType: entityType,
      properties: properties,
      pageSize: localState.selectedPageSize,
      currentPage: localState.currentPage,
      sorting: localState.tableSorting,
      quickSearch: localState.quickSearch,
      filter, //state.tableFilter,
      parentEntityId,
      selectedStoredFilterIds: localState.selectedStoredFilterIds || [],
      selectedFilters: localState.selectedStoredFilters,
    };

    return payload;
  };

  const getFetchTableDataPayload = (): IGetDataPayload => {
    return getFetchTableDataPayloadInternal(state);
  };

  const exportToExcel = () => {
    const payload = getFetchTableDataPayload();

    dispatch(exportToExcelRequestAction());

    axios({
      url: `${backendUrl}` + (getExportToExcelPath ?? `/api/DataTable/ExportToExcel`),
      method: 'POST',
      data: payload,
      responseType: 'blob', // important
      headers,
    })
      .then(response => {
        dispatch(exportToExcelSuccessAction());
        FileSaver.saveAs(new Blob([response.data]), 'Export.xlsx');
      })
      .catch(() => {
        dispatch(exportToExcelErrorAction());
      });
  };

  const fetchTableConfig = (id: string) => dispatch(fetchTableConfigAction(id));

  const setCurrentPage = (val: number) => {
    dispatch(setCurrentPageAction(val));
  };

  const changePageSize = (val: number) => {
    dispatch(changePageSizeAction(val));
  };

  const toggleColumnVisibility = (columnId: string) => {
    dispatch(toggleColumnVisibilityAction(columnId));
  };

  const toggleColumnFilter = (ids: string[]) => dispatch(toggleColumnFilterAction(ids));

  const changeFilterOption = (filterColumnId: string, filterOptionValue: IndexColumnFilterOption) =>
    dispatch(changeFilterOptionAction({ filterColumnId, filterOptionValue }));

  const changeFilter = (filterColumnId: string, filterValue: ColumnFilter) =>
    dispatch(changeFilterAction({ filterColumnId, filterValue }));

  const applyFilters = () => {
    const { columns } = state;

    const filters = columns
      .filter(({ allowFilter }) => allowFilter)
      .map(({ columnId, filterOption, filter }) => ({ columnId, filterOption, filter } as ITableFilter));

    dispatch(applyFilterAction(filters));
  };

  /** change quick search text without refreshing of the table data */
  const changeQuickSearch = (val: string) => {
    dispatch(changeQuickSearchAction(val));
  };

  /** change quick search and refresh table data */
  const performQuickSearch = (val: string) => {
    // note: use thunk to get state after update
    dispatch((dispatch, getState) => {
      dispatch(changeQuickSearchAction(val));
      dispatch(setCurrentPageAction(1));

      const payload = getFetchTableDataPayloadInternal(getState());
      fetchTableData(payload);
    });
  };

  const toggleSaveFilterModal = (visible: boolean) => {
    dispatch(toggleSaveFilterModalAction(visible));
  };

  const clearFilters = () => {
    if (Boolean(userDTSettings)) {
      const newUserSTSettings = { ...userDTSettings };
      delete newUserSTSettings.pageSize;
      delete newUserSTSettings.currentPage;
      delete newUserSTSettings.quickSearch;
      delete newUserSTSettings.tableFilter;
      newUserSTSettings.appliedFiltersColumnIds = [];

      setUserDTSettings(newUserSTSettings);
    }

    dispatch(toggleColumnFilterAction([]));
    dispatch(applyFilterAction([]));
  };

  const changeSelectedRow = (val: number) => {
    dispatch(changeSelectedRowAction(val));
  };

  const changeSelectedStoredFilterIds = (selectedStoredFilterIds: string[]) => {
    dispatch(changeSelectedStoredFilterIdsAction(selectedStoredFilterIds));
  };

  const setPredefinedFilters = (filters: IStoredFilter[]) => {
    dispatch(setPredefinedFiltersAction(filters));
  };

  const changeSelectedIds = (selectedIds: string[]) => {
    dispatch(changeSelectedIdsAction(selectedIds));
  };

  const initializeNewDataCreation = () => {
    const id = nanoid();

    let data = { Id: '' };

    state?.columns?.forEach(column => {
      switch (column.dataType) {
        case 'boolean':
          data[column.accessor] = false;
          break;
        case 'date':
        case 'string':
        case 'date':
          data[column.accessor] = '';
          break;
        case 'number':
          data[column.accessor] = 0;
          break;
        case 'refList':
          data[column.accessor] = { item: null, itemValue: null };
          break;
        case 'entityReference':
          data[column.accessor] = { id: null, displayText: null };
          break;
        case 'multiValueRefList':
          data[column.accessor] = [];
          break;
        default:
          break;
      }
    });

    data.Id = id;

    setCrudRowData({
      id: id,
      data,
      mode: 'create',
    });
  };

  /**
   *
   * @param newOrEditableRowData - data to update. If empty, it'll initialize new item creation
   */
  const setCrudRowData = (newOrEditableRowData?: IEditableRowState) => {
    if (newOrEditableRowData) {
      dispatch(setCreateOrEditRowDataAction(newOrEditableRowData));
    } else {
      initializeNewDataCreation();
    }
  };

  const cancelCreateOrEditRowData = () => {
    dispatch(setCreateOrEditRowDataAction(null));
  };

  const updateLocalTableData = () => {
    dispatch(updateLocalTableDataAction());
  };

  const deleteRowItem = (idOfItemToDeleteOrUpdate: string) => {
    dispatch(deleteRowItemAction(idOfItemToDeleteOrUpdate));
  };

  const getDataProperties = (columns: IConfigurableColumnsBase[]) => {
    const dataFields = columns.filter(c => c.itemType == 'item' && 
      (c as IConfigurableColumnsProps).columnType == 'data' &&
      Boolean((c as IDataColumnsProps).propertyName)) as IDataColumnsProps[];

    const properties = dataFields.map(f => f.propertyName);
    return properties;
  }

  useEffect(() => {
    const { configurableColumns, entityType } = state;
    if (!entityType)
      return;

    const properties = getDataProperties(configurableColumns);
    if (properties.length == 0){
      // don't fetch data from server when properties is empty
      dispatch(fetchColumnsSuccessSuccessAction({ columns: [] }));
      return;
    }

    // fetch columns config from server
    const getColumnsPayload: GetColumnsInput = {
      entityType: entityType,
      properties: properties
    };
    console.log({
      msg: 'fetch columns',
      payload: getColumnsPayload
    });
    axios({
      method: 'POST',
      url: `${backendUrl}/api/DataTable/GetColumns`,
      data: getColumnsPayload,
      headers,
    })
      .then(response => {
        const responseData = response.data as DataTableColumnDtoListAjaxResponse;
        console.log({
          msg: 'fetched columns',
          responseData
        });

        if (responseData.success) {
          dispatch(fetchColumnsSuccessSuccessAction({ columns: responseData.result }));
        }
      })
      .catch((e) => {
        console.log(e);
        //dispatch(exportToExcelErrorAction());
      });
  }, [state.configurableColumns, state.entityType]);

  const registerConfigurableColumns = (ownerId: string, columns: IConfigurableColumnsBase[]) => {
    dispatch(registerConfigurableColumnsAction({ ownerId, columns }));
  }

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <DataTableStateContext.Provider value={{ ...state, onDblClick, onSelectRow, selectedRow }}>
      <DataTableActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          fetchTableConfig,
          fetchTableData,
          setCurrentPage,
          changePageSize,
          toggleColumnVisibility,
          toggleColumnFilter,
          //removeColumnFilter,
          changeFilterOption,
          changeFilter,
          applyFilters,
          clearFilters,
          getDataPayload: getFetchTableDataPayload,
          exportToExcel,
          changeQuickSearch,
          performQuickSearch,
          toggleSaveFilterModal,
          changeSelectedRow,
          changeSelectedStoredFilterIds,
          setPredefinedFilters,
          changeSelectedIds,
          refreshTable,
          setCrudRowData,
          cancelCreateOrEditRowData,
          updateLocalTableData,
          deleteRowItem,
          registerConfigurableColumns,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </DataTableActionsContext.Provider>
    </DataTableStateContext.Provider>
  );
};

function useDataTableState() {
  const context = useContext(DataTableStateContext);

  if (context === undefined) {
    throw new Error('useDataTableState must be used within a DataTableProvider');
  }

  return context;
}

function useDataTableActions() {
  const context = useContext(DataTableActionsContext);

  if (context === undefined) {
    throw new Error('useDataTableActions must be used within a DataTableProvider');
  }

  return context;
}

function useDataTableStore() {
  return { ...useDataTableState(), ...useDataTableActions() };
}

const useDataTable = useDataTableStore;

export default DataTableProvider;

export { DataTableProvider, useDataTableState, useDataTableActions, useDataTable, useDataTableStore };
