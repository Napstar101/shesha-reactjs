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

interface ICreateModalProps {
  updater: (props: any) => IDataMutator;
  prepareValues?: (values: any) => any;
  formPath: string;
}

interface IIndexPageProps {
  title: string;
  tableConfigId: string;
  detailsUrl?: (id: string) => string;
  editUrl?: (id: string) => string;
  createModalProps: ICreateModalProps | null;
}

const TableWithControls: FC<IIndexPageProps> = (props) => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const { refreshTable } = useDataTableStore();

  let toolbarItems: IToolbarItem[] = [];
  if (props.createModalProps)
    toolbarItems.push({
      title: 'Create New',
      icon: <PlusOutlined />,
      onClick: () => setCreateModalVisible(true),
    });

  const handleEntityCreated = (form: FormInstance) => {
    setCreateModalVisible(false);
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
          onCancel={handleCancel}
          onSuccess={handleEntityCreated}
          updater={props.createModalProps.updater}
          prepareValues={props.createModalProps.prepareValues}
          title="Create"
          formPath={props.createModalProps.formPath}
        ></GenericCreateModal>
      )}
    </MainLayout>
  );
};

const IndexPage: FC<IIndexPageProps> = (props) => (
  <DataTableProvider tableId={props.tableConfigId}>
    <TableWithControls {...props}></TableWithControls>
  </DataTableProvider>
);

export default IndexPage;
