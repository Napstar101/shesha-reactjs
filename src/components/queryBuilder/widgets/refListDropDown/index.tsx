import { BaseWidget, BasicConfig, SelectFieldSettings } from 'react-awesome-query-builder';
import { CustomFieldSettings } from '../../../../providers/queryBuilder/models';
import { RefListDropDown } from '../../../../';
import React from 'react';

export type RefListDropdownWidgetType = BaseWidget & SelectFieldSettings;
const RefListDropdownWidget: RefListDropdownWidgetType = {
  ...BasicConfig.widgets.select,
  jsType: 'number',
  type: 'entityAutocomplete',
  factory: props => {
    const { fieldDefinition, value, setValue } = props;
    const customSettings = fieldDefinition.fieldSettings as CustomFieldSettings;

    const onChange = v => {
      setValue(v);
    };

    return (
      <RefListDropDown
        listName={customSettings.referenceListName}
        listNamespace={customSettings.referenceListNamespace}
        value={value}
        onChange={onChange}
        style={{ minWidth: '150px' }}
        size="small"
        showArrow={true}
      ></RefListDropDown>
    );
  },
};

export default RefListDropdownWidget;
