import React, { FC } from 'react';
import { ColumnItemFilter } from '../columnItemFilter';
import { IndexColumnFilterOption, ITableColumn, ColumnFilter } from '../../providers/dataTable/interfaces';

interface IColumnFiltersBaseProps {
  columns: ITableColumn[];
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
}) => {
  return (
    <div className="sha-column-filters">
      {columns.map(
        ({
          id,
          accessor,
          header,
          dataType,
          filter,
          filterOption,
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
                  filter,
                  filterOption,
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
