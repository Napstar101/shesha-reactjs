import React, { FC, MutableRefObject, useEffect } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { SelectOutlined } from '@ant-design/icons';
import TableViewSelectorSettings from './tableViewSelectorSettingsPanel';
import { ITableViewSelectorProps } from './models';
import { evaluateString, IndexViewSelectorRenderer, useForm } from '../../../../../';
import { useDataTableStore } from '../../../../../providers';
import camelCaseKeys from 'camelcase-keys';

const TableViewSelectorComponent: IToolboxComponent<ITableViewSelectorProps> = {
  type: 'tableViewSelector',
  name: 'Table view selector',
  icon: <SelectOutlined />,
  factory: (model: ITableViewSelectorProps, componentRef: MutableRefObject<any>) => {
    return <TableViewSelector componentRef={componentRef} {...model} />;
  },
  initModel: (model: ITableViewSelectorProps) => {
    return {
      ...model,
      filters: [],
    };
  },
  settingsFormFactory: ({ model, onSave, onCancel, onValuesChange }) => {
    return (
      <TableViewSelectorSettings
        model={model as ITableViewSelectorProps}
        onSave={onSave}
        onCancel={onCancel}
        onValuesChange={onValuesChange}
      />
    );
  },
};

export const TableViewSelector: FC<ITableViewSelectorProps> = ({ filters, componentRef }) => {
  const {
    columns,
    getDataSourceType,
    title,
    changeSelectedStoredFilterIds,
    predefinedFilters,
    selectedStoredFilterIds,
    setPredefinedFilters,
    setFormData,
  } = useDataTableStore();

  const { formData } = useForm();

  // console.log('TableViewSelector formData, filters: ', formData, filters);

  const dataSourceType = getDataSourceType();

  componentRef.current = {
    columns,
    dataSourceType,
  };

  // useEffect(() => {
  //   setFormData(formData);
  // }, [formData]);

  useEffect(() => {
    // const filtersString = JSON.stringify(filters);

    // const computedFiltersString = evaluateString(
    //   filtersString,
    //   camelCaseKeys(formData || {}, { pascalCase: true }) || {}
    // );

    // const evaluatedFilters = JSON.parse(computedFiltersString);

    // console.log(
    //   'TableViewSelector formData, filters, evaluatedFilters: ',
    //   camelCaseKeys(formData || {}, { pascalCase: true }),
    //   filters,
    //   evaluatedFilters
    // );

    setPredefinedFilters(filters);

    setFormData(formData);
  }, [filters, formData]);

  const changeSelectedFilter = (id: string) => {
    changeSelectedStoredFilterIds(id ? [id] : []);
  };

  return (
    <IndexViewSelectorRenderer
      header={title || 'Table'}
      filters={predefinedFilters || []}
      onSelectFilter={changeSelectedFilter}
      selectedFilterId={
        selectedStoredFilterIds && selectedStoredFilterIds.length > 0 ? selectedStoredFilterIds[0] : null
      }
    />
  );
};

export default TableViewSelectorComponent;
