import React, { FC } from 'react';
import { GenericRefListDropDown } from './genericRefListDropDown';
import { ReferenceListItemDto } from '../../apis/referenceList';
import { IRefListDropDownProps, ISelectOption } from './models';

export const DtoRefListDropDown: FC<IRefListDropDownProps<ReferenceListItemDto>> = (props) => {

  const getLabeledValue = (itemValue: ReferenceListItemDto, _options: ISelectOption<ReferenceListItemDto>[]) => {
    if (itemValue === undefined)
        return undefined;
    return {
      value: itemValue.itemValue,
      label: itemValue.item,
      data: itemValue
    }
  }

  const getOptionFromFetchedItem = (fetchedItem: ReferenceListItemDto): ISelectOption<ReferenceListItemDto> => {
    return {
      value: fetchedItem.itemValue,
      label: fetchedItem.item,
      data: {
        item: fetchedItem.item,
        itemValue: fetchedItem.itemValue,
      }
    };
  }

  return (
    <GenericRefListDropDown<ReferenceListItemDto>
      getOptionFromFetchedItem={getOptionFromFetchedItem} 
      getLabeledValue={getLabeledValue}
      {...props}    
    />
  );
}