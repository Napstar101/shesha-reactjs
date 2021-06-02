import { useEffect, useRef } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { TableOutlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';
import { Alert } from 'antd';
import { ChildTable, IChildTableProps } from '../../../../';
import { useForm } from '../../../../providers/form';
import { DataTableFullInstance } from '../../../../providers/dataTable/contexts';
import React from 'react';
import { useDataTableState } from '../../../../providers';
import DataTableProvider from '../../../../providers/dataTable';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface IChildDataTableProps extends IConfigurableFormComponent {
  tableConfigId?: string;
  parentEntityId?: string;
}

const settingsForm = settingsFormJson as FormMarkup;

const ChildDataTableComponent: IToolboxComponent<IChildDataTableProps> = {
  type: 'childDataTable',
  name: 'Child DataTable',
  icon: <TableOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as IChildDataTableProps;
    const { formMode, visibleComponentIds } = useForm();
    
    const tableRef = useRef<DataTableFullInstance>(null);
    const { registerActions } = useForm();

    useEffect(
      () =>
        registerActions(model.id, {
          refresh: () => {
            tableRef.current?.refreshTable();
          },
        }),
      []
    );
    // todo: refactor and implement a generic way for values evaluation (maybe pass values evaluator from the ConfigurableForm level)
    //const { formData } = useForm();
    //const parentEntityId = evaluateValue(customProps.parentEntityId, { data: formData });

    const tableProps: IChildTableProps = {
      id: customProps.tableConfigId,
      header: customProps.label,
      // extra: (
      //   <Button icon={<UserAddOutlined />} size="small" onClick={onExtraClick}>
      //     Add
      //   </Button>
      // ),
      // deleteRow: (id: string) => deleteShaRoleAppointedPerson({ id }),
      // editClick: onEditClick,
    };

    if (!tableProps.id) return <Alert message="Child DataTable is not configured properly" type="warning" showIcon />;
    const { parentEntityId: currentParentEntityId } = useDataTableState();

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return (
      <DataTableProvider tableId={tableProps.id} parentEntityId={currentParentEntityId}>
        <ChildTable {...tableProps} tableRef={tableRef} />
      </DataTableProvider>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default ChildDataTableComponent;
