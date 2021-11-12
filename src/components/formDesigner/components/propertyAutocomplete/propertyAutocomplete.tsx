import { FC, useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import React from 'react';
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

    const meta = useMetadata(false);
    const { metadata } = meta || {};

    useEffect(() => {
        const properties = metadata?.properties || [];
        const opts = properties.map(p => ({ value: p.path, label: p.label }));
        setOptions(opts);
    }, [metadata]);
    /*
    const { getActiveProvider } = useMetadataDispatcher();

    const metaProvider = getActiveProvider();
    console.log({metaProvider});


    useEffect(() => {
        return;
        if (!options) {
            console.log('options are null')
            if (metaProvider) {
                console.log('provider exists - fetch')
                metaProvider.getMetadata().then(meta => {
                    console.log('meta loaded')
                    const properties = meta.properties || [];
                    const opts = properties.map(p => ({ value: p.path, label: p.label }));
                    setOptions(opts);
                    console.log('options set')
                });
            } else
                console.log('provider missing')
        }
    }, [metaProvider]);
    */

    const onSelect = (data: string) => {
        if (props.onChange)
            props.onChange(data);

        //
    };
    const onSearch = (data: string) => {
        if (props.onChange)
            props.onChange(data);

        // 1. fetch additional metadata if required and change options
        // 2. if existing property selected - activate `fill` button
    }

    return (
        <AutoComplete
            value={props.value}
            options={options}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={onSearch}
        // filterOption={(inputValue, option) =>
        //     option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        // }
        ></AutoComplete>
    );
}

export default PropertyAutocomplete;