import { FC, useEffect, useState } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../../providers/form/models';
import { LayoutOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { useForm } from '../../../../../providers/form';
import settingsFormJson from './settingsForm.json';
import { IShaDataTableProps } from '../../../../../';
import { DataTableSelectionProvider, useDataTableSelection } from '../../../../../providers/dataTableSelection';
import ComponentsContainer from '../../../componentsContainer';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';
import { useDataTableStore } from '../../../../../providers';
import DataTableProvider from '../../../../../providers/dataTable';

export interface ITableContextComponentProps extends IConfigurableFormComponent {
  tableConfigId?: string;
  entityType?: string;
}

const settingsForm = settingsFormJson as FormMarkup;

const TableContextComponent: IToolboxComponent<ITableContextComponentProps> = {
  type: 'datatableContext',
  name: 'DataTable Context',
  icon: <LayoutOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as ITableContextComponentProps;

    return <TableContext {...customProps}></TableContext>;
  },
  initModel: (model: IConfigurableFormComponent) => {
    return {
      ...model,
      items: [],
    };
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export const TableContext: FC<ITableContextComponentProps> = props => {
  const [table, setTable] = useState(<></>);

  useEffect(() => {
    setTable(<TableContextInner key={props.tableConfigId} {...props}></TableContextInner>);
  }, [props.tableConfigId, props.entityType]);

  return table;
};

export const TableContextInner: FC<ITableContextComponentProps> = props => {
  const { tableConfigId, entityType, label } = props;
  const { formMode } = useForm();
  const [selectedRow, setSelectedRow] = useState(-1);
  const isDesignMode = formMode === 'designer';

  console.log({
    source: 'context',
    isDesignMode,
    tableConfigId,
    entityType
  });
  if (isDesignMode && !tableConfigId && !entityType) 
    return <Alert className="sha-designer-warning" message="Table is not configured properly" type="warning" />;

  const tableProps: IShaDataTableProps = {
    id: tableConfigId,
    header: label,
    // actionColumns: [
    //   { icon: <ToolOutlined />, onClick: id => `/settings/forms/designer?id=${id}` },
    //   { icon: <EditOutlined />, onClick: id => `/settings/forms/edit?id=${id}` },
    // ],
    //disableCustomFilters: true,
  };

  const onSelectRow = index => {
    setSelectedRow(index);
  };

  return (
    <DataTableSelectionProvider>
      <DataTableProvider 
        tableId={tableProps.id}
        entityType={entityType}
        title={label}
        selectedRow={selectedRow}
        onSelectRow={onSelectRow}
      >
        <TableContextAccessor {...props}></TableContextAccessor>
      </DataTableProvider>
    </DataTableSelectionProvider>
  );
};

const TableContextAccessor: FC<ITableContextComponentProps> = ({ id, tableConfigId }) => {
  const { registerActions } = useForm();
  const { refreshTable, exportToExcel, tableConfigLoaded } = useDataTableStore();
  const { selectedRow } = useDataTableSelection();

  const deleteRow = () => {
    console.log(`deleteRow ${selectedRow.id}`);
  };

  // register available actions, refresh on every table configuration loading or change of the table Id
  useEffect(
    () =>
      registerActions(id, {
        refresh: refreshTable,
        exportToExcel,
        deleteRow: deleteRow,
      }),
    [tableConfigLoaded, tableConfigId, selectedRow]
  );

  return <ComponentsContainer containerId={id}></ComponentsContainer>;
};

export default TableContextComponent;
