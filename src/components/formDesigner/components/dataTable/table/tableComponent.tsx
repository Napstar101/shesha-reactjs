import { FC, Fragment } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { IConfigurableFormComponent } from '../../../../../providers/form/models';
import { TableOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { useForm } from '../../../../../providers/form';
import {
  IndexTable,
  CollapsibleSidebarContainer,
  IndexTableColumnFilters,
  IndexTableColumnVisibilityToggle,
} from '../../../../../';
import { useDataTableSelection } from '../../../../../providers/dataTableSelection';
import React from 'react';
import { useDataTableStore } from '../../../../../providers';
import TableSettings from './tableComponent-settings';
import { ITableComponentProps } from './models';

const TableComponent: IToolboxComponent<ITableComponentProps> = {
  type: 'datatable',
  name: 'DataTable',
  icon: <TableOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as ITableComponentProps;

    return <TableContext {...customProps}></TableContext>;
  },
  initModel: (model: IConfigurableFormComponent) => {
    return {
      ...model,
      items: [],
    };
  },
  settingsFormFactory: ({ model, onSave, onCancel, onValuesChange, form }) => {
    return (
      <TableSettings
        model={ model as ITableComponentProps }
        onSave={onSave}
        onCancel={onCancel}
        onValuesChange={onValuesChange}
        form={form}
      />
    );
  },
};

const NotConfiguredWarning: FC = () => {
  return <Alert className="sha-designer-warning" message="Table is not configured properly" type="warning" />;
};

export const TableContext: FC<ITableComponentProps> = ({}) => {
  const { formMode } = useForm();
  const isDesignMode = formMode === 'designer';

  //try {
    const {
      tableId,
      entityType,
      isInProgress: { isFiltering, isSelectingColumns },
      setIsInProgressFlag,
    } = useDataTableStore();

    const { selectedRow, setSelectedRow } = useDataTableSelection();

    const renderSidebarContent = () => {
      if (isFiltering) {
        return <IndexTableColumnFilters />;
      }

      if (isSelectingColumns) {
        return <IndexTableColumnVisibilityToggle />;
      }

      return <Fragment />;
    };

    const toggleFieldPropertiesSidebar = () =>
      !isSelectingColumns && !isFiltering
        ? setIsInProgressFlag({ isFiltering: true })
        : setIsInProgressFlag({ isFiltering: false, isSelectingColumns: false });

    console.log(
      {
        isDesignMode,
        tableId,
        entityType
      }
    );

    if (isDesignMode && !tableId && !entityType) 
      return <NotConfiguredWarning></NotConfiguredWarning>;

    const onSelectRow = (index: number, row: any) => {
      setSelectedRow(index, row);
    };

    return (
      <CollapsibleSidebarContainer
        rightSidebarProps={{
          open: isSelectingColumns || isFiltering,
          onOpen: toggleFieldPropertiesSidebar,
          onClose: toggleFieldPropertiesSidebar,
          title: 'Table Columns',
          content: renderSidebarContent,
        }}
        allowFullCollapse
      >
        <IndexTable id={tableId} onSelectRow={onSelectRow} selectedRowIndex={selectedRow?.index} />
      </CollapsibleSidebarContainer>
    );
  // } catch (error) {
  //   return <NotConfiguredWarning></NotConfiguredWarning>;
  // }
};

export default TableComponent;
