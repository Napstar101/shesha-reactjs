import { DATA_TABLE_CONTEXT_INITIAL_STATE, DEFAULT_PAGE_SIZE_OPTIONS, IDataTableStateContext } from './contexts';
import { DataTableActionEnums, IChangeFilterAction, IChangeFilterOptionPayload, IFetchTableConfigSuccessPayload } from './actions';
import flagsReducer from '../utils/flagsReducer';
import { IEditableRowState, IGetDataPayload, IndexColumnDataType, IStoredFilter, ITableColumn, ITableDataResponse, ITableFilter, SortDirection } from './interfaces';
import { handleActions } from 'redux-actions';

const reducer = handleActions<IDataTableStateContext, any>({
  [DataTableActionEnums.ChangeSelectedRow]: (state: IDataTableStateContext, action: ReduxActions.Action<number>) => {
    const { payload } = action;
    return {
      ...state,
      selectedRow: payload,
    };
  },

  [DataTableActionEnums.ChangeSelectedIds]: (state: IDataTableStateContext, action: ReduxActions.Action<string[]>) => {
    const { payload } = action;
    return {
      ...state,
      selectedIds: payload,
    };
  },

  [DataTableActionEnums.ChangeSelectedStoredFilterIds]: (state: IDataTableStateContext, action: ReduxActions.Action<string[]>) => {
    const { payload } = action;
    return {
      ...state,
      selectedStoredFilterIds: payload,
    };
  },

  [DataTableActionEnums.ApplyFilter]: (state: IDataTableStateContext, action: ReduxActions.Action<ITableFilter[]>) => {
    const { payload } = action;
    return {
      ...state,
      tableFilter: payload,
      currentPage: 1,
    };
  },

  [DataTableActionEnums.ToggleSaveFilterModal]: (state: IDataTableStateContext, action: ReduxActions.Action<boolean>) => {
    const { payload } = action;
    return {
      ...state,
      saveFilterModalVisible: payload
    };
  },

  [DataTableActionEnums.SetCrudRowData]: (state: IDataTableStateContext, action: ReduxActions.Action<IEditableRowState>) => {
    const { payload } = action;
    return {
      ...state,
      newOrEditableRowData: payload
    };
  },

  [DataTableActionEnums.SetCurrentPage]: (state: IDataTableStateContext, action: ReduxActions.Action<number>) => {
    const { payload } = action;
    return {
      ...state,
      currentPage: payload
    };
  },

  [DataTableActionEnums.ChangePageSize]: (state: IDataTableStateContext, action: ReduxActions.Action<number>) => {
    const { payload } = action;
    return {
      ...state,
      selectedPageSize: payload
    };
  },

  [DataTableActionEnums.ChangeQuickSearch]: (state: IDataTableStateContext, action: ReduxActions.Action<string>) => {
    const { payload } = action;
    return {
      ...state,
      quickSearch: payload
    };
  },

  [DataTableActionEnums.FetchTableData]: (state: IDataTableStateContext, action: ReduxActions.Action<IGetDataPayload>) => {
    const { payload } = action;

    return {
      ...state,
      isFetchingTableData: true,
      tableId: payload.id, // todo: isolate all table properties including id, for now we just pass the id from the fetch aciton
      tableSorting: payload.sorting,
      currentPage: payload.currentPage,
      selectedPageSize: payload.pageSize,
      parentEntityId: payload.parentEntityId,
      selectedStoredFilterIds: payload.selectedStoredFilterIds ?? [],
    };
  },

  [DataTableActionEnums.FetchTableDataError]: (state: IDataTableStateContext) => {
    return {
      ...state,
      isFetchingTableData: false,
      hasFetchTableDataError: true,
    };
  },

  [DataTableActionEnums.FetchTableDataSuccess]: (state: IDataTableStateContext, action: ReduxActions.Action<ITableDataResponse>) => {
    const { payload: { rows, totalPages, totalRows, totalRowsBeforeFilter } } = action;
    
    return {
      ...state,
      tableData: rows,
      totalPages,
      totalRows,
      totalRowsBeforeFilter,
      isFetchingTableData: false,
    };
  },

  [DataTableActionEnums.FetchTableConfig]: (state: IDataTableStateContext, action: ReduxActions.Action<string>) => {
    const { payload } = action;
    
    return {
      ...state,
      tableId: payload
    };
  },
  
  [DataTableActionEnums.FetchTableConfigError]: (state: IDataTableStateContext, action: ReduxActions.Action<boolean>) => {
    const { payload } = action;

    return {
      ...state,
      isFetchingTableData: false,
      hasFetchTableDataError: payload,
    };
  },

  [DataTableActionEnums.FetchTableConfigSuccess]: (state: IDataTableStateContext, action: ReduxActions.Action<IFetchTableConfigSuccessPayload>) => {
    const { payload: { tableConfig, userConfig } } = action;
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

    const filteredFilters = storedFilters
      ?.filter(f => Boolean(f.id))
      .map<IStoredFilter>(filter => ({ ...filter }));

    return {
      ...state,

      isFetchingTableData: false,
      tableConfigLoaded: true,
      columns: cols,
      currentPage: userConfig?.currentPage || 1,
      selectedPageSize: userConfig?.pageSize || DEFAULT_PAGE_SIZE_OPTIONS[1],
      quickSearch: userConfig?.quickSearch,
      tableFilter: userConfig?.tableFilter,
      selectedStoredFilterIds: userConfig?.selectedStoredFilterIds || [],
      storedFilters: [...(state.storedFilters || []), ...filteredFilters],
      tableSorting: userConfig?.tableSorting,
      appliedFiltersColumnIds: userConfig?.appliedFiltersColumnIds || [],
      crudConfig: {
        createUrl,
        updateUrl,
        deleteUrl,
        detailsUrl,
      },
    };
  },

  [DataTableActionEnums.UpdateLocalTableData]: (state: IDataTableStateContext) => {
    const { tableData, newOrEditableRowData } = state;

    const rows = tableData as any[];

    const foundItem = rows?.find(({ Id }) => Id === newOrEditableRowData?.id);

    return {
      ...state,
      tableData: foundItem
        ? rows?.map(item => {
            if (item?.Id === newOrEditableRowData?.id) {
              return newOrEditableRowData?.data;
            }

            return item;
          })
        : [newOrEditableRowData?.data, ...(tableData || [])],
      newOrEditableRowData: null,
    };
  },

  [DataTableActionEnums.DeleteRowItem]: (state: IDataTableStateContext, action: ReduxActions.Action<string>) => {
    const { tableData, newOrEditableRowData } = state;
    const idOfItemToDeleteOrUpdate = action.payload;

    return {
      ...state,
      tableData: (tableData as any[])?.filter(({ Id }) => Id !== idOfItemToDeleteOrUpdate),
      newOrEditableRowData: idOfItemToDeleteOrUpdate === newOrEditableRowData?.id ? null : newOrEditableRowData,
    };
  },

  [DataTableActionEnums.ToggleColumnFilter]: (state: IDataTableStateContext, action: ReduxActions.Action<string[]>) => {
    const { payload: appliedFiltersColumnIds } = action;
    return {
      ...state,
      appliedFiltersColumnIds,
      hasUnappliedChanges: !!appliedFiltersColumnIds?.length,
      filteredColumns: appliedFiltersColumnIds?.length ? state.filteredColumns : [],
      columns: state.columns.map(({ allowFilter, id, filter, ...rest }) => ({
        id,
        ...rest,
        allowFilter: appliedFiltersColumnIds.includes(id),
        filter: appliedFiltersColumnIds.includes(id) ? filter : null,
      })),
    };
  },

  [DataTableActionEnums.ToggleColumnVisibility]: (state: IDataTableStateContext, action: ReduxActions.Action<string>) => {
    const { payload: columnIdToToggle } = action;
    return {
      ...state,
      columns: state.columns.map(({ id, show, ...rest }) => {
        if (id === columnIdToToggle) {
          return {
            id,
            ...rest,
            show: !show,
          };
        }
        return { id, show, ...rest };
      }),
    };
  },

  [DataTableActionEnums.ChangeFilterOption]: (state: IDataTableStateContext, action: ReduxActions.Action<IChangeFilterOptionPayload>) => {
    const { payload: { filterColumnId, filterOptionValue } } = action;

    return {
      ...state,
      hasUnappliedChanges: true,
      columns: state.columns.map(({ id, filterOption, filter, ...rest }) => {
        const isThisItem = id === filterColumnId;

        return {
          id,
          ...rest,
          filterOption: isThisItem ? filterOptionValue : filterOption,
          filter: isThisItem ? null : filter,
        };
      }),
    };
  },

  [DataTableActionEnums.ChangeFilter]: (state: IDataTableStateContext, action: ReduxActions.Action<IChangeFilterAction>) => {
    const { payload: { filterColumnId, filterValue } } = action;

    return {
      ...state,
      hasUnappliedChanges: true,
      columns: state.columns.map(({ id, filter, ...rest }) => ({
        id,
        ...rest,
        filter: id === filterColumnId ? filterValue : filter,
      })),
    };
  },

  [DataTableActionEnums.SetPredefinedFilters]: (state: IDataTableStateContext, action: ReduxActions.Action<IStoredFilter[]>) => {
    const { payload: filters } = action;

    return {
      ...state,
      predefinedFilters: filters ? [...filters] : [],
    };
  }
}, DATA_TABLE_CONTEXT_INITIAL_STATE);

export function dataTableReducer(
  incomingState: IDataTableStateContext,
  action: ReduxActions.Action<any>
): IDataTableStateContext {
  const flaggedState = flagsReducer(incomingState, action) as IDataTableStateContext;
  const newState = reducer(flaggedState, action);
  
  return newState;
}