import React, { FC } from 'react';
import { MainLayout, ShaSpin } from '../';
import IndexTableFull, { IIndexTableFullProps } from '../indexTableFull';
import DataTableProvider from '../../providers/dataTable';

export interface IIndexPageProps extends Omit<IIndexTableFullProps, 'id'> {
  /**
   * Page title
   */
  title: string;

  /**
   * The id for the table
   */
  tableConfigId: string;

  loading?: boolean;
}

const TableWithControls: FC<IIndexPageProps> = ({ loading = false, ...props}) => {
  return (
    <MainLayout title={props.title} showHeading={false} noPadding >
      <ShaSpin spinning={loading}>
        <IndexTableFull
          id={props.tableConfigId}
          header={props.title}
          {...props}
          
      />
      </ShaSpin>
    </MainLayout>
  );
};

const SimpleIndexPage: FC<IIndexPageProps> = props => (
  <DataTableProvider tableId={props.tableConfigId}>
    <TableWithControls {...props} />
  </DataTableProvider>
);

export default SimpleIndexPage;
