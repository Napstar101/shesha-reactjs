import { FC, Fragment } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../../providers/form/models';
import { TableOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { useForm } from '../../../../../providers/form';
import settingsFormJson from './settingsForm.json';
import {
  IndexTable,
  CollapsibleSidebarContainer,
  IndexTableColumnFilters,
  IndexTableColumnVisibilityToggle,
} from '../../../../../';
import { useDataTableSelection } from '../../../../../providers/dataTableSelection';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';
import { useDataTableStore } from '../../../../../providers';

export interface ITableContextComponentProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const TableComponent: IToolboxComponent<ITableContextComponentProps> = {
  type: 'datatable',
  name: 'DataTable',
  icon: <TableOutlined />,
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

const NotConfiguredWarning: FC = () => {
  return <Alert className="sha-designer-warning" message="Table is not configured properly" type="warning" />;
};

export const TableContext: FC<ITableContextComponentProps> = ({}) => {
  const { formMode } = useForm();
  const isDesignMode = formMode === 'designer';

  try {
    const {
      tableId,
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

    if (!tableId && isDesignMode) return <NotConfiguredWarning></NotConfiguredWarning>;

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
  } catch (error) {
    return <NotConfiguredWarning></NotConfiguredWarning>;
  }
};

export default TableComponent;
