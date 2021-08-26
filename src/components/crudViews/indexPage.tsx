import React, { FC, useState } from 'react';
import { MainLayout, GenericCreateModal } from '../';
import { PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { IDataMutator } from './models';
import IndexTableFull from '../indexTableFull';
import { IToolbarItem } from '../../interfaces';
import DataTableProvider from '../../providers/dataTable';
import { useDataTableStore } from '../../providers';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { notification } from 'antd';

interface ICreateModalProps {
  /**
   * Title for the modal
   */
  title?: string;

  /**
   * A mutate function to update the entity
   */
  updater: (props: any) => IDataMutator;

  /**
   * A function to prepare modal values
   */
  prepareValues?: (values: any) => any;

  /**
   * The path for the form
   */
  formPath: string;

  /**
   * Allows you to capture the form and have the modal remain open
   */
   keepModalOpenAfterSave?: boolean;
}

export interface IIndexPageProps {
  /**
   * Page title
   */
  title: string;

  /**
   * The id for the table
   */
  tableConfigId: string;

  /**
   * A callback for redirecting the user to the details page of the modal
   */
  detailsUrl?: (id: string) => string;

  /**
   * A callback for redirecting the user to the edit page of the modal
   */
  editUrl?: (id: string) => string;

  /**
   * The props for the modal used to add an entity
   */
  createModalProps?: ICreateModalProps | null;

  /**
   * A callback for when the file export has succeeded
   */
  onExportSuccess?: () => void;
}

const TableWithControls: FC<IIndexPageProps> = props => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const { refreshTable } = useDataTableStore();

  let toolbarItems: IToolbarItem[] = [];

  if (props.createModalProps)
    toolbarItems.push({
      title: 'Create New',
      icon: <PlusOutlined />,
      onClick: () => setCreateModalVisible(true),
    });

  const handleEntityCreated = (form: FormInstance, keepModalOpenAfterSave: boolean) => {
    if (!keepModalOpenAfterSave) {
      setCreateModalVisible(false);
    } else {
      notification.success({
        message: 'Success',
        description: 'Data has successfully been saved.'
      })
    }

    form.resetFields();

    refreshTable();
  };

  const handleCancel = (form: FormInstance) => {
    setCreateModalVisible(false);
    form.resetFields();
  };

  return (
    <MainLayout title={props.title} showHeading={false} noPadding>
      <IndexTableFull
        id={props.tableConfigId}
        header={props.title}
        actionColumns={[
          { icon: <SearchOutlined />, onClick: props.detailsUrl },
          { icon: <EditOutlined />, onClick: props.editUrl },
        ]}
        toolbarItems={toolbarItems}
      />
      {props.createModalProps && (
        <GenericCreateModal
          visible={createModalVisible}
          title="Create"
          onCancel={handleCancel}
          onSuccess={handleEntityCreated}
          {...props.createModalProps}
        />
      )}
    </MainLayout>
  );
};

const IndexPage: FC<IIndexPageProps> = props => (
  <DataTableProvider tableId={props.tableConfigId}>
    <TableWithControls {...props}></TableWithControls>
  </DataTableProvider>
);

export default IndexPage;
