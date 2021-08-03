import React, { FC } from 'react';
import { ColumnItemFilter } from '../columnItemFilter';
import { IndexColumnFilterOption, ITableColumn, ColumnFilter, ITableFilter } from '../../providers/dataTable/interfaces';

interface IColumnFiltersBaseProps {
  columns: ITableColumn[];
  currentFilter?: ITableFilter[];
  appliedFiltersColumnIds: string[];
  changeFilterOption: (filterColumnId: string, filterOptionValue: IndexColumnFilterOption) => void;
  changeFilter: (filterColumnId: string, filterValue: any) => void;
  toggleColumnFilter: (ids: string[]) => void;
  applyFilters: () => void;
}

export const ColumnFiltersBase: FC<IColumnFiltersBaseProps> = ({
  columns,
  appliedFiltersColumnIds,
  changeFilterOption,
  changeFilter,
  toggleColumnFilter,
  applyFilters,
  currentFilter,
}) => {
  const filterableColumns = columns.filter(c => Boolean(appliedFiltersColumnIds.find(id => id === c.id)));
  
  return (
    <div className="sha-column-filters">
      {filterableColumns.map(
        ({
          id,
          accessor,
          header,
          dataType,
          allowFilter,
          referenceListName,
          referenceListNamespace,
          entityReferenceTypeShortAlias,
        }) => {
          if (allowFilter) {

            const onRemoveFilter = (idOfFilter: string) => {
              toggleColumnFilter(appliedFiltersColumnIds.filter(id => id !== idOfFilter));
            };

            const onChangeFilterOption = (filterId: string, fOption: IndexColumnFilterOption) => {
              if (changeFilterOption) {
                changeFilterOption(filterId, fOption);
              }
            };

            const onChangeFilter = (filterId: string, fltr: ColumnFilter) => {
              if (changeFilter) {
                changeFilter(filterId, fltr);
              }
            };

            const existingFilter = currentFilter.find(f => f.columnId === id);
            return (
              <ColumnItemFilter
                onRemoveFilter={onRemoveFilter}
                onChangeFilterOption={onChangeFilterOption}
                onChangeFilter={onChangeFilter}
                {...{
                  id,
                  filterName: header,
                  accessor,
                  dataType,
                  filter: existingFilter?.filter,
                  filterOption: existingFilter?.filterOption,
                  allowFilter,
                  applyFilters,
                  referenceListName,
                  referenceListNamespace,
                  entityReferenceTypeShortAlias,
                }}
                key={id}
              />
            );
          }

          return null;
        }
      )}
    </div>
  );
};

export default ColumnFiltersBase;
