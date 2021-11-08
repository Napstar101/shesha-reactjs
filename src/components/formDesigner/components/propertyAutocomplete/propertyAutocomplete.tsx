import { FC } from 'react';
import { AutoComplete } from 'antd';
import { useForm } from '../../../../providers';
import React from 'react';

export interface IPropertyAutocompleteProps {
    value?: string;
    onChange?: (value: string) => void;
}

export const PropertyAutocomplete: FC<IPropertyAutocompleteProps> = (props) => {
    const { getActiveDataSource: getActiveDataSurce } = useForm();
    const dataSource = getActiveDataSurce();
    console.log({ s:'propauto', dataSource });
    const properties = dataSource?.items || [];
    const opts = properties.map(p => ({ value: p.path, label: p.label }));

    console.log({properties})

    const onSelect = (data: string) => {
        if (props.onChange)
            props.onChange(data);
    };

    return (
        <AutoComplete
            value={props.value}
            options={opts}
            style={{ width: 200 }}
            onSelect={onSelect}
            filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
        ></AutoComplete>
    );
}

export default PropertyAutocomplete;