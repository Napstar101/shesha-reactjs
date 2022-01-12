import React, { useState, useEffect, useMemo, ReactNode } from 'react';
import { Select, Tag } from 'antd';
import { AjaxResponseBase, AutocompleteItemDto, useAutocompleteList } from '../../apis/autocomplete';
import { useGet } from 'restful-react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { useDebouncedCallback } from 'use-debounce';
import qs from 'qs';
import { LabeledValue } from 'antd/lib/select';
import { IGuidNullableEntityWithDisplayNameDto, IReadOnly } from '../..';
import { ReadOnlyDisplayFormItem } from './../readOnlyDisplayFormItem';

export type AutocompleteDataSourceType = 'entitiesList' | 'url';

export interface ISelectOption<TValue = any> {
  // todo: make generic
  value: string | number;
  label: string | React.ReactNode;
  data: TValue;
}

export type CustomLabeledValue<TValue = any> = LabeledValue & { data: TValue };

export interface IAutocompleteProps<TValue = any> extends IReadOnly {
  /**
   * The value of the autocomplete
   *
   * If the value is of this form, then we do not need to fetch items from the server
   */
  value?: TValue | TValue[];

  /**
   * Default value
   */
  defaultValue?: TValue | TValue[];

  /**
   * Get option from an item fetched from the back-end
   */
  getOptionFromFetchedItem?: (fetchedItem: object) => ISelectOption<TValue>;

  /**
   * Get CustomLabeledValue from value
   */
  getLabeledValue?: (value: TValue, options: ISelectOption<TValue>[]) => CustomLabeledValue<TValue>;

  /**
   * Specify content to show when no result matches
   */
  notFoundContent?: ReactNode;

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

  /**
   * If true, the automplete will be in read-only mode. This is not the same sa disabled mode
   */
  readOnly?: boolean;

  /**
   *
   */
  readOnlyMultipleMode?: 'raw' | 'tags';
}

export interface UrlFetcherQueryParams {
  term?: string | null;
  selectedValue?: string | null;
}

const getQueryString = (url: string) => {
  const idx = url?.indexOf('?') || -1;
  if (idx === -1) return {};

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

export const Autocomplete = <TValue,>(props: IAutocompleteProps<TValue>) => {
  const {
    value,
    defaultValue,
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
    notFoundContent,
    getOptionFromFetchedItem,
    getLabeledValue,
    readOnly,
    readOnlyMultipleMode = 'raw',
  } = props;

  const entityFetcher = useAutocompleteList({ lazy: true });

  const urlFetcher = useGet<any, AjaxResponseBase, UrlFetcherQueryParams, void>(
    decodeURI(trimQueryString(dataSourceUrl)) || '',
    {
      lazy: true,
    }
  );

  const itemsFetcher = dataSourceType === 'entitiesList' ? entityFetcher : dataSourceType === 'url' ? urlFetcher : null;

  const [autocompleteText, setAutocompleteText] = useState(null);

  const doFetchItems = (term: string) => {
    const selectedValue =
      typeof value === 'string'
        ? value
        : /*: isStringArray(value)
        ? value*/
          undefined;

    // if value is specified but displayText is not specified - fetch text from the server
    if (dataSourceType === 'entitiesList') {
      entityFetcher.refetch({
        queryParams: {
          term: term,
          typeShortAlias: typeShortAlias,
          allowInherited: allowInherited,
          selectedValue: selectedValue, // This worked if value was a string, but now it's either an object or a list of object. 17.11.2021 Ivan: But it doesn't mean that we can skip loose string values
        },
      });
    }

    if (dataSourceType === 'url' && dataSourceUrl) {
      const queryParams = {
        ...getQueryString(dataSourceUrl),
        term: term,
        selectedValue: selectedValue,
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

  const wrapValue = (value: TValue | TValue[]): CustomLabeledValue<TValue> | CustomLabeledValue<TValue>[] => {
    if (!Boolean(value)) return undefined;
    if (mode === 'multiple' || mode === 'tags') {
      return Array.isArray(value)
        ? (value as TValue[]).map<CustomLabeledValue<TValue>>(o => {
            return getLabeledValue(o, options);
          })
        : [getLabeledValue(value as TValue, options)];
    } else return getLabeledValue(value as TValue, options);
  };

  const options = useMemo<ISelectOption<TValue>[]>(() => {
    const fetchedData = getFetchedItems() || [];

    const fetchedItems = fetchedData.map<ISelectOption<TValue>>(item => {
      const option = Boolean(getOptionFromFetchedItem)
        ? (getOptionFromFetchedItem(item) as ISelectOption<TValue>)
        : (item as ISelectOption<TValue>);

      return option;
    });

    const selectedItem = wrapValue(value);
    // Remove items which are already exist in the fetched items.
    // Note: we shouldn't process full list and make it unique because by this way we'll hide duplicates received from the back-end
    const selectedItems = selectedItem
      ? (Array.isArray(selectedItem) ? selectedItem : [selectedItem]).filter(
          i => fetchedItems.findIndex(fi => fi.value === i.value) === -1
        )
      : [];

    const result = [...fetchedItems, ...selectedItems];
    return result;
  }, [value, autocompleteText, entityFetcher || urlFetcher]);

  const handleSearch = (value: string) => {
    setAutocompleteText(value);
    if (value) {
      debouncedFetchItems(value);
    }
  };

  const handleChange = (_value: CustomLabeledValue<TValue>, option: any) => {
    if (!Boolean(onChange)) return;
    const selectedValue = Boolean(option)
      ? Array.isArray(option)
        ? (option as ISelectOption<TValue>[]).map(o => o.data)
        : (option as ISelectOption<TValue>).data
      : undefined;

    if (mode === 'multiple' || mode === 'tags') {
      onChange(Array.isArray(selectedValue) ? selectedValue : [selectedValue]);
    } else onChange(selectedValue);
  };

  if (readOnly) {
    const wrappedValue = wrapValue(value);

    let displayValue: any;

    if (Array.isArray(wrappedValue)) {
      displayValue = wrappedValue?.map(({ label, value: keyId }: any) =>
        readOnlyMultipleMode === 'raw' && typeof label === 'string' ? label : <Tag key={keyId}>{label}</Tag>
      );

      if (readOnlyMultipleMode === 'raw') displayValue = (displayValue as any[])?.join(', ');
    } else {
      displayValue = (wrappedValue as any)?.label;
    }

    return <ReadOnlyDisplayFormItem>{displayValue}</ReadOnlyDisplayFormItem>;
  }

  return (
    <Select<CustomLabeledValue<TValue> | CustomLabeledValue<TValue>[]>
      showSearch
      labelInValue={true}
      notFoundContent={notFoundContent}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      value={wrapValue(value)}
      defaultValue={wrapValue(defaultValue)}
      onChange={handleChange}
      allowClear={true}
      loading={itemsFetcher?.loading}
      placeholder={placeHolder}
      disabled={disabled}
      bordered={bordered}
      style={style}
      size={size}
      mode={value ? mode : undefined} // When mode is multiple and value is null, the control shows an empty tag
    >
      {options?.map(({ value, label, data }) => (
        <Select.Option value={value} key={value} data={data}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};

type IDtoType = IGuidNullableEntityWithDisplayNameDto | IGuidNullableEntityWithDisplayNameDto[];

export const EntityDtoAutocomplete = (props: IAutocompleteProps<IDtoType>) => {
  const getDtoFromFetchedItem = (item): ISelectOption<IDtoType> => {
    return {
      value: item['value'],
      label: item['displayText'],
      data: {
        id: item['value'],
        displayText: item['displayText'],
      },
    };
  };

  const labeledValueGetter = (
    itemValue: IGuidNullableEntityWithDisplayNameDto,
    _options: ISelectOption<IDtoType>[]
  ) => {
    return {
      value: itemValue.id,
      label: itemValue.displayText,
      data: itemValue,
    };
  };

  return (
    <Autocomplete
      getOptionFromFetchedItem={getDtoFromFetchedItem}
      getLabeledValue={labeledValueGetter}
      {...props}
    ></Autocomplete>
  );
};

export const RawAutocomplete = (props: IAutocompleteProps<string>) => {
  const getDtoFromFetchedItem = (item): ISelectOption<string> => {
    return {
      value: item['value'],
      label: item['displayText'],
      data: item['value'],
    };
  };

  const labeledValueGetter = (itemValue: string, options: ISelectOption<string>[]) => {
    if (!Boolean(itemValue)) return null;
    const item = options?.find(i => i.value === itemValue);

    const val = {
      value: itemValue,
      label: item?.label ?? 'unknown',
      data: itemValue,
    };

    console.log('RawAutocomplete val: ', val);

    return {
      value: itemValue,
      label: item?.label ?? 'unknown',
      data: itemValue,
    };
  };

  // if (props.readOnly) {
  //   const displayValue = typeof value === 'string' ? options?.
  //   return <BasicDisplayFormItem>{props?.value}</BasicDisplayFormItem>
  // }

  return (
    <Autocomplete<string>
      getOptionFromFetchedItem={getDtoFromFetchedItem}
      getLabeledValue={labeledValueGetter}
      {...props}
    ></Autocomplete>
  );
};

type InternalAutocompleteType = typeof Autocomplete;
interface InternalAutocompleteInterface extends InternalAutocompleteType {
  Raw: typeof RawAutocomplete;
  EntityDto: typeof EntityDtoAutocomplete;
}

const AutocompleteInterface = Autocomplete as InternalAutocompleteInterface;
AutocompleteInterface.Raw = RawAutocomplete;
AutocompleteInterface.EntityDto = EntityDtoAutocomplete;

export default AutocompleteInterface;
