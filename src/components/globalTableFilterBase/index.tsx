import React, { FC } from 'react';
import Search from 'antd/lib/input/Search';
import { SearchProps } from 'antd/lib/input';

interface IGlobalTableFilterProps {
  searchProps?: SearchProps;
  changeQuickSearch: (val: string) => void;
  performQuickSearch?: (val: string) => void;
  quickSearch: string;
}

export const GlobalTableFilterBase: FC<IGlobalTableFilterProps> = ({
  searchProps,
  changeQuickSearch,
  performQuickSearch,
  quickSearch,
}) => {
  const srcProps: SearchProps = {
    size: 'small',
    allowClear: true,
    ...searchProps,
  };

  return (
    <div className="sha-global-table-filter">
      <Search
        value={quickSearch}
        onSearch={performQuickSearch}
        onChange={e => changeQuickSearch(e.target.value)}
        onClick={event => event?.stopPropagation()}
        {...srcProps}
      />
    </div>
  );
};

export default GlobalTableFilterBase;
