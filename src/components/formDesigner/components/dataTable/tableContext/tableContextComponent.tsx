import { FC, useEffect, useState } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { LayoutOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import settingsFormJson from './settingsForm.json';
import { IShaDataTableProps } from '../../../../../';
import { DataTableSelectionProvider, useDataTableSelection } from '../../../../../providers/dataTableSelection';
import ComponentsContainer from '../../../componentsContainer';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';
import { MetadataProvider, useDataTableStore, useForm } from '../../../../../providers';
import DataTableProvider from '../../../../../providers/dataTable';
import { FormMarkup, IConfigurableFormComponent } from '../../../../../providers/form/models';

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
  const { addDataSource, removeDataSource } = useForm();
  const { entityType } = props;

   
  useEffect(() => {
    const uniqueKey = `${props.tableConfigId ?? 'empty'}_${props.entityType ?? 'empty'}`; // is used just for re-rendering
    setTable(<TableContextInner key={uniqueKey} {...props}></TableContextInner>);
  }, [props.tableConfigId, props.entityType]);

  useEffect(() => {
    removeDataSource(props.id);
  }, [entityType]);

  const onMetadataLoaded = (properties) => {
    addDataSource({ id: props.id, name: entityType, containerType: entityType, items: properties });
  }
  const onMetadataCleanup = () => {
    removeDataSource(props.id);
  }

  return entityType
    ? <MetadataProvider
        id={props.id}
        containerType={entityType}
        onMetadataLoaded={onMetadataLoaded}
        cleanup={onMetadataCleanup}
      >
        {table}
      </MetadataProvider>
    : table;
};

export const TableContextInner: FC<ITableContextComponentProps> = props => {
  const { tableConfigId, entityType, label } = props;
  const { formMode } = useForm();
  const [selectedRow, setSelectedRow] = useState(-1);
  const isDesignMode = formMode === 'designer';

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
        userConfigId={props.id}
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
