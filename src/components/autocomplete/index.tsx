import React, { FC, useState, useEffect } from 'react';
import { Select } from 'antd';
import { AutocompleteItemDto, useAutocompleteList } from '../../apis/autocomplete';
import { useGet } from 'restful-react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { useDebouncedCallback } from 'use-debounce';
import qs from 'qs';
import { IGuidNullableEntityWithDisplayNameDto } from '../..';

export type AutocompleteDataSourceType = 'entitiesList' | 'url';

interface IDropdownOptionData {
  key?: string;
  value?: string;
  children?: any;
}

export interface IAutocompleteProps {
  /**
   * The value of the autocomplete
   */
  value?: string;

  /**
   * The text to display on the autocomplete
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

const trimQueryString = (url: string): string => {
  if (!url) return url;
  const idx = url.indexOf('?');
  return idx > -1 ? url.substr(0, idx) : url;
};

const getQueryString = (url: string) => {
  const idx = url?.indexOf('?') || -1;
  if (idx == -1) return {};

  const queryString = url.substr(idx);
  return qs.parse(queryString, { ignoreQueryPrefix: true });
};

/**
 * A component for working with dynamic autocomplete
 */
export const Autocomplete: FC<IAutocompleteProps> = ({ mode = null, onChange ,...props }) => {
  const entityFetcher = useAutocompleteList({ lazy: true });
  const urlFetcher = useGet<any, any, UrlFetcherQueryParams>(trimQueryString(props.dataSourceUrl) || '', {
    lazy: true,
  });

  const itemsFetcher =
    props.dataSourceType === 'entitiesList' ? entityFetcher : props.dataSourceType === 'url' ? urlFetcher : null;

  const [autocompleteText, setAutocompleteText] = useState(null);

  const getValue = () => {
    const value = typeof props?.value === 'string'
    ? props?.value
    : (props?.value as [])?.map((item) => {

      if (typeof item === 'string') {
        return item;
      }

      return (item as IGuidNullableEntityWithDisplayNameDto)?.id;
    })

    return value;
  }

  const dofetchItems = (term: string) => {
    // if value is specified but displayText is not specified - fetch text from the server
    if (props.dataSourceType === 'entitiesList') {
      entityFetcher.refetch({
        queryParams: {
          term: term,
          typeShortAlias: props.typeShortAlias,
          allowInherited: props.allowInherited,
          selectedValue: props.value,
        },
      });
    }

    if (props.dataSourceType === 'url' && props.dataSourceUrl) {
      const queryParams = {
        ...getQueryString(props.dataSourceUrl),
        term: term,
        selectedValue: props.value,
      };
      urlFetcher.refetch({
        queryParams: queryParams,
      });
    }
  };

  useEffect(() => {
    dofetchItems(null);
  }, [props.dataSourceType]);

  const getFetchedItems = (): AutocompleteItemDto[] => {
    switch (props.dataSourceType) {
      case 'entitiesList':
        return entityFetcher.data?.result;

      case 'url':
        return urlFetcher.data?.result;
      default:
        return null;
    }
  };

  const debouncedfetchItems = useDebouncedCallback<(value: string) => void>(
    value => {
      dofetchItems(value);
    },
    // delay in ms
    200
  );

  const data = getFetchedItems() || [];
  const options =
    Boolean(autocompleteText) || Boolean(data)
      ? data?.map(d => (
          <Select.Option value={d.value} key={d.value}>
            {d.displayText}
          </Select.Option>
        ))
      : props.value
      ? [
          <Select.Option value={props.value} key={props.value}>
            {props.displayText}
          </Select.Option>,
        ]
      : [];

  const handleSearch = (value: any) => {
    setAutocompleteText(value);
    if (value) {
      debouncedfetchItems(value);
    }
  };

  const handleChange = (value: string, option: any) => {
    if (mode === 'multiple' || mode === 'tags') {
      const values: IGuidNullableEntityWithDisplayNameDto[] = (option as IDropdownOptionData[])
        .map(({ key, children }) => ({ id: key, displayText: children }));

        onChange(values, values);
    } else {
      onChange(value, option);
    }
  }

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      defaultValue={props.value}
      notFoundContent={null}
      onChange={handleChange}
      allowClear={true}
      loading={itemsFetcher?.loading}
      placeholder={props.placeHolder}
      value={getValue()}
      // value={props.value}
      disabled={props.disabled}
      bordered={props.bordered}
      style={props.style}
      size={props.size}
      mode={mode}
    >
      {options}
    </Select>
  );
};

export default Autocomplete;
