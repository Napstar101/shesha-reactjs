import { FC, useEffect, useState } from 'react';
import { AutoComplete, Button, Input } from 'antd';
import React from 'react';
import { ThunderboltOutlined } from '@ant-design/icons';
import { useMetadata } from '../../../../providers';

export interface IPropertyAutocompleteProps {
    value?: string;
    onChange?: (value: string) => void;
}

interface IOption {
    value: string;
    label: string;
}

const testValues: IOption[] = [
    { value: 'FirstName', label: 'FirstName' },
    { value: 'LastName', label: 'LastName' },
    { value: 'Email1', label: 'Email1' },
    { value: 'Email2', label: 'Email2' },
];

export const PropertyAutocomplete: FC<IPropertyAutocompleteProps> = (props) => {
    const [options, setOptions] = useState<IOption[]>(testValues);

    // @ts-ignore
    const [canFillProps, setCanFillProps] = useState(true);

    const meta = useMetadata(false);
    const { metadata } = meta || {};

    useEffect(() => {
        const properties = metadata?.properties || [];
        const opts = properties.map(p => ({ value: p.path, label: p.label }));
        setOptions(opts);
    }, [metadata]);

    /* 
     1. implement search functionality
     2. implement select functionality
     3. implement fill properties
    */ 

    const onSelect = (data: string) => {
        if (props.onChange)
            props.onChange(data);

        console.log('selected: ' + data);
    };

    const onSearch = (data: string) => {
        if (props.onChange)
            props.onChange(data);

        // 1. fetch additional metadata if required and change options
        // 2. if existing property selected - activate `fill` button
    }

    const onFillPropsClick = () => {
        console.log('fill props');
    }

    return (
        <>
            <Input.Group>
                <AutoComplete
                    value={props.value}
                    options={options}
                    style={{ width: '85%' }} /* todo: add normal styles like it's done for the search field*/
                    onSelect={onSelect}
                    onSearch={onSearch}
                // filterOption={(inputValue, option) =>
                //     option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                // }
                >
                </AutoComplete>
                <Button icon={<ThunderboltOutlined />} onClick={onFillPropsClick} disabled={!canFillProps}></Button>
            </Input.Group>
        </>
    );
}

export default PropertyAutocomplete;