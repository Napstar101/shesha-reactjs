import React, { FC, Key, useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { nanoid } from 'nanoid';
import { ReferenceListItemDto, useReferenceListGetItems } from '../../apis/referenceList';
import { getCachedItems, saveListItems } from './utils';
import { IReferenceListItemValueDto } from '../..';

export interface IRefListDropDownOption {
  children?: string;
  key: string;
  value?: Key;
}

export interface IRefListDropDownProps extends SelectProps<any> {
  /**
   * Reference list name
   */
  listName: string;
  /**
   * Reference list namespace
   */
  listNamespace: string;
  /**
   * How large should the button be?
   */
  filters?: number[];
  includeFilters?: boolean;
  width?: number;
  base?: string;
  value?: IReferenceListItemValueDto | IReferenceListItemValueDto[];
  ignoredValues?: number[];
}

const RefListDropDown: FC<IRefListDropDownProps> = ({
  listName,
  listNamespace,
  showArrow = true,
  value,
  includeFilters = false,
  filters = [],
  width,
  base,
  mode,
  onChange,
  ...rest
}) => {
  // todo: implement referencelist provider with cache support and promise result
  const { refetch: fetchItems, loading, data: listItemsResult } = useReferenceListGetItems({
    lazy: true,
    base,
  });

  const [cachedListItems, setCachedListItems] = useState<ReferenceListItemDto[]>([]);

  useEffect(() => {
    if (listName && listNamespace) {
      const cachedItems = getCachedItems(listName, listNamespace);

      if (cachedItems?.length) {
        setCachedListItems(cachedItems);
      } else {
        fetchItems({ queryParams: { name: listName, namespace: listNamespace } });
      }
    }
  }, [listName, listNamespace]);

  useEffect(() => {
    if (listItemsResult?.result) {
      saveListItems(listName, listNamespace, listItemsResult?.result);
    }
  }, [listItemsResult]);

  const filter = ({ itemValue }: ReferenceListItemDto) => {
    if (!filters?.length) {
      return true;
    }

    const filtered = filters?.includes(itemValue);

    return includeFilters ? filtered : !filtered;
  };

  const listItems = cachedListItems?.length ? cachedListItems : listItemsResult?.result;

  const options = listItems?.filter(filter);

  const memoizedValue = useMemo(() => {
    if (Array.isArray(value)) {
      return (value as IReferenceListItemValueDto[])?.map(({ itemValue }) => {
        return itemValue;
      });
    } else if (typeof value === 'object') {
      return value?.itemValue;
    }

    return undefined;
  }, [value]);

  const handleChange = (value: string, option: any) => {
    if (!Boolean(onChange))
      return;
    if (mode === 'multiple' || (mode === 'tags' && Array.isArray(option))) {
      console.log('handleChange value, option : ', value, option);

      if (Array.isArray(value)) {
        const values: IReferenceListItemValueDto[] = (option as IRefListDropDownOption[])?.map(
          ({ value, children }) => ({
            itemValue: Number(value),
            item: children,
          })
        );
        onChange(values, option);
      } else {
        const val: IReferenceListItemValueDto = { itemValue: Number(value), item: option?.children };
        onChange([val], [val] as any);
      }
    } else {
      const val: IReferenceListItemValueDto = { itemValue: Number(value), item: option?.children };
      onChange(val, val as any);
    }
  };

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      showArrow={showArrow}
      notFoundContent={null}
      allowClear={true}
      loading={loading}
      filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      {...rest}
      style={{ width }}
      onChange={handleChange}
      defaultValue={memoizedValue as any} // Type 'string | string[]' is not assignable to type 'string'. Type 'string[]' is not assignable to type 'string'.
      value={memoizedValue as any}
      mode={mode}
    >
      {options?.map(({ item, itemValue }: ReferenceListItemDto) => (
        <Select.Option value={itemValue} key={nanoid()}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
};

export default RefListDropDown;
