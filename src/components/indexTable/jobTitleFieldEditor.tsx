import React, { FC, Fragment, useState, useEffect } from 'react';
import { Input } from 'antd';
import RefListDropDown, { IRefListDropDownOption } from '../refListDropDown';
import { ReferenceListItemDto } from '../../apis/referenceList';
import { IColumnEditFieldProps } from './interfaces';

const OTHER_OPTION = 6;
// const OTHER_OPTION = 999;

// "Dsd.Npo", "JobTitle",  "Dsd.Npo", "TypeOfMeeting"

export const JobTitleFieldEditor: FC<IColumnEditFieldProps> = ({
  name: name,
  caption,
  dataType = 'string',
  value: stateValue,
  onChange: handleChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<ReferenceListItemDto>();

  useEffect(() => {
    if (selectedOption.itemValue !== OTHER_OPTION) {
      handleChange(name, selectedOption.itemValue);
    }

    console.log('selectedOption: ', selectedOption);
  }, [selectedOption]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, event?.target?.value);
  };

  const renderRenderRefListDropdown = () => {
    const placeholder = `Select ${caption}`;

    const onChange = (_: number | number[], option: any) => {
      const val = {
        itemValue: (option as IRefListDropDownOption)?.value as number,
        item: (option as IRefListDropDownOption)?.children,
      };

      setSelectedOption(val);

      // handleChange(name, val);
    };

    const val =
      dataType === 'multiValueRefList'
        ? (stateValue as ReferenceListItemDto[]).map(({ itemValue }) => itemValue).filter(Boolean)
        : (stateValue as ReferenceListItemDto)?.itemValue;

    return (
      <Fragment>
        <RefListDropDown
          listName="JobTitle"
          listNamespace="Dsd.Npo"
          size="small"
          mode={dataType === 'refList' ? null : 'multiple'}
          placeholder={placeholder}
          style={{ width: '100%' }}
          onChange={onChange}
          value={val}
        />

        {selectedOption.itemValue === OTHER_OPTION && <Input onChange={handleInputChange} />}
      </Fragment>
    );
  };

  return <div className="column-item-filter">{renderRenderRefListDropdown()}</div>;
};

export default JobTitleFieldEditor;
