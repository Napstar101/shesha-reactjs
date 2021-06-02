import React, { FC } from 'react';
import { useDataTable } from '../../providers';
import IndexViewSelectorRenderer from '../indexViewSelectorRenderer';

interface IProps {
  /**
  * @deprecated pass this on an `IndexTableProvider` level
  */
  header?: string;
}

export const IndexViewSelector: FC<IProps> = ({ header }) => {
  const { title, changeSelectedStoredFilterIds, storedFilters, predefinedFilters, selectedStoredFilterIds } = useDataTable();

  const changeSelectedFilter = (id: string) => {
    changeSelectedStoredFilterIds(id ? [id] : []);
  }

  const allFilters = [...(predefinedFilters || []), ...(storedFilters || [])];

  return (
    <IndexViewSelectorRenderer
      header={header || title}
      filters={allFilters}
      onSelectFilter={changeSelectedFilter}
      selectedFilterId={selectedStoredFilterIds && selectedStoredFilterIds.length > 0  ? selectedStoredFilterIds[0] : null}
    />
  );
};

export default IndexViewSelector;
