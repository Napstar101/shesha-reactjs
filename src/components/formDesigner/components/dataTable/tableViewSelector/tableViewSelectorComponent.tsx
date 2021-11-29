import { FC, MutableRefObject, useEffect } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { IConfigurableFormComponent } from '../../../../../providers/form/models';
import { SelectOutlined } from '@ant-design/icons';
import TableViewSelectorSettings from './tableViewSelectorSettingsPanel';
import { ITableViewSelectorProps } from './models';
import { Alert } from 'antd';
import { useForm } from '../../../../../providers/form';
import { IndexViewSelectorRenderer } from '../../../../../';
import React from 'react';
import { useDataTableStore } from '../../../../../providers';

const TableViewSelectorComponent: IToolboxComponent<ITableViewSelectorProps> = {
  type: 'tableViewSelector',
  name: 'Table view selector',
  icon: <SelectOutlined />,
  factory: (model: IConfigurableFormComponent, componentRef: MutableRefObject<any>) => {
    const customProps = model as ITableViewSelectorProps;

    return <TableViewSelector componentRef={componentRef} {...customProps}></TableViewSelector>;
  },
  initModel: (model: IConfigurableFormComponent) => {
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
  // todo: implement custom validation  
};

export const TableViewSelector: FC<ITableViewSelectorProps> = ({ filters, componentRef }) => {
  const { formMode } = useForm();
  const isDesignMode = formMode === 'designer';
  const { columns, getDataSourceType } = useDataTableStore();
  const dataSourceType = getDataSourceType();
  componentRef.current = {
    columns,
    dataSourceType
  };

  if (filters.length === 0 && isDesignMode)
    return (
      <Alert
        className="sha-designer-warning"
        message="Filters are not defined. Press 'Customise Filters' button to add them"
        type="warning"
      />
    );

  const {
    title,
    changeSelectedStoredFilterIds,
    predefinedFilters,
    selectedStoredFilterIds,
    setPredefinedFilters,
  } = useDataTableStore();

  useEffect(() => {
    setPredefinedFilters(filters);
  }, [filters]);

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
