import React, { FC, useState, useEffect } from 'react';
import { Input } from 'antd';
import { useMemo } from 'react';
import { ReferenceListItemDto } from '../../apis/referenceList';
import { IColumnEditFieldProps } from '../indexTable/interfaces';
import RefListDropDown from '../refListDropDown';
// import RefListDropDown, { IRefListDropDownOption } from 'shesha-reactjs/dist/components/refListDropDown';

const OTHER_OPTION = 999;
// const OTHER_OPTION = 999;

export const JobTitleFieldEditor: FC<IColumnEditFieldProps> = ({
  name: name,
  caption,
  dataType = 'string',
  value: stateValue,
  onChange: handleChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<ReferenceListItemDto>({});

  useEffect(() => {
    if (selectedOption.item) {
      if (selectedOption.itemValue !== OTHER_OPTION) {
        handleChange(name, selectedOption.item);
      } else {
        handleChange(name, '');
      }
    }
  }, [selectedOption]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, event?.target?.value);
  };

  const renderRenderRefListDropdown = () => {
    const placeholder = `Select ${caption}`;

    const onChange = (_: number | number[], option: any) => {
      const val = {
        itemValue: (option as any)?.value as number,
        item: (option as any)?.children,
      };

      setSelectedOption(val);

      // handleChange(name, val);
    };

    const val =
      dataType === 'multiValueRefList'
        ? (stateValue as ReferenceListItemDto[]).map(({ itemValue }) => itemValue).filter(Boolean)
        : (stateValue as ReferenceListItemDto)?.itemValue;

    const showInputField = useMemo(() => {
      if (stateValue && !selectedOption?.itemValue) {
        return true;
      }

      if (selectedOption?.item) {
        return selectedOption?.itemValue === OTHER_OPTION;
      }
    }, [selectedOption, stateValue]);

    const getInputValue = () => {
      if (stateValue && !selectedOption?.itemValue) {
        return stateValue;
      }

      if (selectedOption?.item) {
        return selectedOption?.itemValue === OTHER_OPTION ? stateValue : '';
      }
    };

    return (
      <div>
        <RefListDropDown
          listName="JobTitle"
          listNamespace="Dsd.Npo"
          size="small"
          placeholder={placeholder}
          style={{ width: showInputField ? '50%' : '100%' }}
          onChange={onChange}
          value={val}
        />

        {showInputField && (
          <Input
            onChange={handleInputChange}
            value={getInputValue() as string}
            size="small"
            style={{ width: '50%', marginLeft: '5px' }}
            placeholder="Enter option"
          />
        )}
      </div>
    );
  };

  return <div className="column-item-filter">{renderRenderRefListDropdown()}</div>;
};

export default JobTitleFieldEditor;
