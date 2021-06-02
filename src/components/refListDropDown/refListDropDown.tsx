import React, { FC, Key, useEffect, useState } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { nanoid } from 'nanoid';
import { ReferenceListItemDto, useReferenceListGetItems } from '../../apis/referenceList';
import { getCachedItems, saveListItems } from './utils';

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
	...rest
}) => {
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
		const localFilter = filters?.includes(itemValue as number);

		return localFilter ? filter : !filter;
	};

	const listItems = cachedListItems?.length ? cachedListItems : listItemsResult?.result;

	const options = filters?.length ? listItems?.filter(filter) : listItems;

	const selectProps = { ...rest, value: options ? value : null };

	return (
		<Select
			showSearch
			defaultActiveFirstOption={false}
			showArrow={showArrow}
			notFoundContent={null}
			allowClear={true}
			loading={loading}
			filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			{...selectProps}
			style={{ width }}
		>
			{options?.map(({ item, itemValue }: ReferenceListItemDto) => (
				<Select.Option value={itemValue as number} key={nanoid()}>
					{item}
				</Select.Option>
			))}
		</Select>
	);
};

export default RefListDropDown;
