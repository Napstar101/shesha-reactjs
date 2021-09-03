import React, { FC } from 'react';
import { MainLayout } from '../';
import IndexTableFull, { IIndexTableFullProps } from '../indexTableFull';
import DataTableProvider from '../../providers/dataTable';

export interface IIndexPageProps extends IIndexTableFullProps {
  /**
   * Page title
   */
  title: string;

  /**
   * The id for the table
   */
  tableConfigId: string;
}

const TableWithControls: FC<IIndexPageProps> = props => {

  return (
    <MainLayout title={props.title} showHeading={false} noPadding>
      <IndexTableFull
        id={props.tableConfigId}
        header={props.title}
        {...props}
      />
    </MainLayout>
  );
};

const SimpleIndexPage: FC<IIndexPageProps> = props => (
  <DataTableProvider tableId={props.tableConfigId}>
    <TableWithControls {...props} />
  </DataTableProvider>
);

export default SimpleIndexPage;
