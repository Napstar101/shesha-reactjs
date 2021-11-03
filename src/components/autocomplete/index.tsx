import React, { FC, useState, useEffect, useMemo } from 'react';
import { Select } from 'antd';
import { AjaxResponseBase, AutocompleteItemDto, useAutocompleteList } from '../../apis/autocomplete';
import { useGet } from 'restful-react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { useDebouncedCallback } from 'use-debounce';
import qs from 'qs';
import { IGuidNullableEntityWithDisplayNameDto } from '../..';
import _ from 'lodash';

export type AutocompleteDataSourceType = 'entitiesList' | 'url';

interface IDropdownOptionData {
  key?: string;
  value?: string;
  children?: any;
}

export interface IAutocompleteProps {
  /**
   * The value of the autocomplete
   *
   * If the value is of this form, then we do not need to fetch items from the server
   */
  value?: IGuidNullableEntityWithDisplayNameDto | IGuidNullableEntityWithDisplayNameDto[]; // string | string[]

  defaultValue?: IGuidNullableEntityWithDisplayNameDto | IGuidNullableEntityWithDisplayNameDto[]; // string | string[]

  /**
   * The text to display on the autocomplete
   * @deprecated - the property is no longer needed since the type of the value has changed
   */
  displayText?: string;

  /**
   * The placeholder to display on the autocomplete
   */
  placeHolder?: string;

  /**
   * The short alias if this is a reference list
   */
  typeShortAlias?: string;

  /**
   * Applies if this is a reference list
   */
  allowInherited?: boolean;

  /**
   * A callback for when the value of this component changes
   */
  onChange?: any;

  /**
   * Whether this control is disabled
   */
  disabled?: boolean;

  /**
   * Wether the component is bordered
   */
  bordered?: boolean;

  /**
   * Data source url. Applies if `dataSourceType` is `url`
   */
  dataSourceUrl?: string;

  /**
   * Data source of this Autocomplete
   */
  dataSourceType: AutocompleteDataSourceType;

  /**
   * Styles to apply to the select component that gets rendered by this control
   */
  style?: React.CSSProperties;

  /**
   * The size of the control
   */
  size?: SizeType;

  /**
   * The size of the control
   */
  mode?: 'multiple' | 'tags';

  allowClear?: boolean;
}

export interface UrlFetcherQueryParams {
  term?: string | null;
  selectedValue?: string | null;
}

const getQueryString = (url: string) => {
  const idx = url?.indexOf('?') || -1;
  if (idx == -1) return {};

  const queryString = url.substr(idx);
  return qs.parse(queryString, { ignoreQueryPrefix: true });
};

const trimQueryString = (url: string): string => {
  if (!url) return url;
  const idx = url.indexOf('?');
  return idx > -1 ? url.substr(0, idx) : url;
};

/**
 * A component for working with dynamic autocomplete
 */
export const Autocomplete: FC<IAutocompleteProps> = ({
  value,
  placeHolder,
  typeShortAlias,
  allowInherited,
  onChange,
  disabled,
  bordered,
  dataSourceUrl,
  dataSourceType,
  style,
  size,
  mode,
}) => {
  const entityFetcher = useAutocompleteList({ lazy: true });

  const urlFetcher = useGet<any, AjaxResponseBase, UrlFetcherQueryParams, void>(
    decodeURI(trimQueryString(dataSourceUrl)) || '',
    {
      lazy: true,
    }
  );

  const itemsFetcher = dataSourceType === 'entitiesList' ? entityFetcher : dataSourceType === 'url' ? urlFetcher : null;

  const [autocompleteText, setAutocompleteText] = useState(null);

  const memoizedValue = useMemo(() => {
    if (Array.isArray(value)) {
      return (value as IGuidNullableEntityWithDisplayNameDto[])?.map(({ id }) => {
        return id;
      });
    } else if (typeof value === 'object') {
      return value?.id;
    }

    return undefined;
  }, [value]);

  const doFetchItems = (term: string) => {
    // if value is specified but displayText is not specified - fetch text from the server
    if (dataSourceType === 'entitiesList') {
      entityFetcher.refetch({
        queryParams: {
          term: term,
          typeShortAlias: typeShortAlias,
          allowInherited: allowInherited,
          // selectedValue: value, // This worked if value was a string, but now it's either an object or a list of object
        },
      });
    }

    if (dataSourceType === 'url' && dataSourceUrl) {
      const queryParams = {
        ...getQueryString(dataSourceUrl),
        term: term,
        // selectedValue: value,
      };
      urlFetcher.refetch({
        queryParams: queryParams,
      });
    }
  };

  useEffect(() => {
    doFetchItems(null);
  }, [dataSourceType]);

  const getFetchedItems = (): AutocompleteItemDto[] => {
    switch (dataSourceType) {
      case 'entitiesList':
        return entityFetcher.data?.result;

      case 'url':
        return urlFetcher.data?.result;
      default:
        return [];
    }
  };

  const debouncedFetchItems = useDebouncedCallback<(value: string) => void>(
    value => {
      doFetchItems(value);
    },
    // delay in ms
    200
  );

  const getValuesArray = (val: IGuidNullableEntityWithDisplayNameDto | IGuidNullableEntityWithDisplayNameDto[]) => {
    if (!val) return [];

    return Array.isArray(val)
      ? val?.map(({ id, displayText }) => ({ value: id, displayText }))
      : [
          {
            value: val?.id,
            displayText: val?.displayText,
          },
        ];
  };

  const options: AutocompleteItemDto[] = useMemo(() => {
    const fetchedData = getFetchedItems() || [];

    const values = getValuesArray(value);

    const prevValues = []; //getValuesArray(previousValue) = ;

    return _.uniqBy([...fetchedData, ...values, ...prevValues], 'value') || [];
  }, [value, autocompleteText, entityFetcher || urlFetcher]);

  const handleSearch = (value: any) => {
    setAutocompleteText(value);
    if (value) {
      debouncedFetchItems(value);
    }
  };

  const handleChange = (value: string, option: any) => {
    if (mode === 'multiple' || (mode === 'tags' && Array.isArray(option))) {
      if (Array.isArray(value)) {
        const values: IGuidNullableEntityWithDisplayNameDto[] = (option as IDropdownOptionData[])?.map(
          ({ key, children }) => ({ id: key, displayText: children })
        );
        onChange(values, values);
      } else {
        const val = { id: value, displayText: option?.children };
        onChange([val], [val]);
      }
    } else {
      const val = { id: value, displayText: option?.children };
      onChange(val, val);
    }
  };

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      defaultValue={memoizedValue as any} // Type 'string | string[]' is not assignable to type 'string'. Type 'string[]' is not assignable to type 'string'.
      value={memoizedValue as any}
      notFoundContent={null}
      onChange={handleChange}
      allowClear={true}
      loading={itemsFetcher?.loading}
      placeholder={placeHolder}
      // value={value}
      disabled={disabled}
      bordered={bordered}
      style={style}
      size={size}
      mode={value ? mode : undefined} // When mode is multiple and value is null, the control shows an empty tag
    >
      {options?.map(({ value, displayText }) => (
        <Select.Option value={value} key={value}>
          {displayText}
        </Select.Option>
      ))}
    </Select>
  );
};

export default Autocomplete;
