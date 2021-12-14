import React, { CSSProperties, FC, Key, useEffect, useState } from 'react';
import { Radio, RadioChangeEvent, RadioGroupProps } from 'antd';
import { nanoid } from 'nanoid/non-secure';
import { ReferenceListItemDto, useReferenceListGetItems } from '../../apis/referenceList';
import classNames from 'classnames';
import { getCachedItems, saveListItems } from '../refListDropDown/utils';

const RadioButton = Radio.Button;

export interface IRefListDropDownOption {
  children?: string;
  key: string;
  value?: Key;
}

export interface IRefListRadioButtonsProps extends RadioGroupProps {
  /** Reference list name */
  listName: string;

  /** Reference list namespace */
  listNamespace: string;

  /** Filters - these are the reference list values that you want to show. If passed, only these will be shown and the rest won't */
  filters?: number[];

  /** The orientation of the radio button */
  orientation?: 'vertical' | 'inline';

  /**
   * A callback for when the selections change
   */
  onSelectionChange?: (value: number, event?: RadioChangeEvent) => void;

  /** The selected value */
  value?: number | ReferenceListItemDto;
}

/** A component for displaying reference list item as radio buttons */
const RefListRadioButtons: FC<IRefListRadioButtonsProps> = ({
  listName,
  listNamespace,
  value,
  filters = [],
  orientation = 'inline',
  optionType = 'default',
  size,
  onChange,
  onSelectionChange,
  ...rest
}) => {
  const { refetch: fetchItems, data: listItemsResult } = useReferenceListGetItems({ lazy: true });
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
    const localFilter = filters?.includes(itemValue);

    return localFilter ? filter : !filter;
  };

  const numericValue = typeof value === 'number' ? value : value?.itemValue;

  const listItems = cachedListItems?.length ? cachedListItems : listItemsResult?.result;

  const options = filters?.length ? listItems?.filter(filter) : listItems;

  const radioProps = { ...rest, value: options ? numericValue : null };

  const RadioType = optionType === 'button' ? RadioButton : Radio;

  const radioStyle: CSSProperties =
    orientation === 'vertical' ? { display: 'block', height: '30px', lineHeight: '30px' } : {};

  const handleChange = (event: RadioChangeEvent) => {
    if (onSelectionChange) {
      onSelectionChange(event?.target?.value, event);
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Radio.Group onChange={handleChange} {...radioProps} className={'sha-ref-list-radio-buttons'}>
      {options?.map(({ item, itemValue }) => (
        <RadioType
          value={itemValue}
          style={radioStyle}
          key={nanoid()}
          className={classNames({ 'buttons-vertical': orientation === 'vertical' && optionType === 'button' })}
        >
          {item}
        </RadioType>
      ))}
    </Radio.Group>
  );
};

export default RefListRadioButtons;
