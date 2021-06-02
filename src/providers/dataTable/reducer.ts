import { IDataTableStateContext } from './contexts';
import { DataTableActionEnums } from './actions';
import flagsReducer from '../utils/flagsReducer';
import { IStoredFilter } from './interfaces';

export function dataTableReducerInner(
  incomingState: IDataTableStateContext,
  action: ReduxActions.Action<any>
): IDataTableStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action) as IDataTableStateContext;

  const { type, payload } = action;

  //#endregion

  switch (type) {
    case DataTableActionEnums.FetchTableConfig:
    case DataTableActionEnums.FetchTableConfigError:
    case DataTableActionEnums.FetchTableData:
    case DataTableActionEnums.FetchTableDataSuccess:
    case DataTableActionEnums.FetchTableDataError:
    case DataTableActionEnums.ChangePageSize:
    case DataTableActionEnums.SetCurrentPage:
    case DataTableActionEnums.ApplyFilter:
    case DataTableActionEnums.ChangeQuickSearch:
    case DataTableActionEnums.ToggleSaveFilterModal:
    case DataTableActionEnums.InitializeTableConfig:
    case DataTableActionEnums.ChangeSelectedRow:
    case DataTableActionEnums.ChangeSelectedStoredFilterIds:
    case DataTableActionEnums.SetCrudRowData:
    case DataTableActionEnums.ChangeSelectedIds: {
      return {
        ...state,
        ...payload,
      };
    }

    case DataTableActionEnums.FetchTableConfigSuccess: {
      const { storedFilters, ...rest } = payload;

      const newStoredFilters = [...(state.storedFilters || []), ...storedFilters];

      return {
        ...state,
        ...rest,
        storedFilters: newStoredFilters,
      };
    }

    case DataTableActionEnums.UpdateLocalTableData: {
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
    }
    case DataTableActionEnums.DeleteRowItem: {
      const { tableData, newOrEditableRowData } = state;
      const { idOfItemToDeleteOrUpdate } = payload;

      return {
        ...state,
        tableData: (tableData as any[])?.filter(({ Id }) => Id !== idOfItemToDeleteOrUpdate),
        newOrEditableRowData: idOfItemToDeleteOrUpdate === newOrEditableRowData?.id ? null : newOrEditableRowData,
      };
    }
    case DataTableActionEnums.ToggleColumnFilter: {
      const { appliedFiltersColumnIds } = payload;
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
    }
    // case DataTableActionEnums.RemoveColumnFilter:
    case DataTableActionEnums.ToggleColumnVisibility:
      return {
        ...state,
        columns: state.columns.map(({ id, show, ...rest }) => {
          if (id === payload.columnIdToToggle) {
            return {
              id,
              ...rest,
              show: !show,
            };
          }
          return { id, show, ...rest };
        }),
      };
    case DataTableActionEnums.ChangeFilterOption: {
      const { filterColumnId, filterOptionValue } = payload;

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
    }
    case DataTableActionEnums.ChangeFilter: {
      const { filterColumnId, filterValue } = payload;

      return {
        ...state,
        hasUnappliedChanges: true,
        columns: state.columns.map(({ id, filter, ...rest }) => ({
          id,
          ...rest,
          filter: id === filterColumnId ? filterValue : filter,
        })),
      };
    }

    case DataTableActionEnums.SetPredefinedFilters: {
      const filters = payload as IStoredFilter[];

      return {
        ...state,
        predefinedFilters: filters ? [...filters] : [],
      };
    }

    default: {
      return state;
    }
  }
}

export function dataTableReducer(
  incomingState: IDataTableStateContext,
  action: ReduxActions.Action<any>
): IDataTableStateContext {
  const newState = dataTableReducerInner(incomingState, action);
  /* temporary stuff for debug only
  if (incomingState.selectedStoredFilterIds && !newState.selectedStoredFilterIds){
    const { type, payload } = action;
    console.log({ type, payload });
  }
  */

  return newState;
}
