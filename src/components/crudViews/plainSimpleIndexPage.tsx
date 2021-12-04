import React, { FC, Fragment } from 'react';
import { ShaSpin } from '..';
import IndexTableFull, { IIndexTableFullProps } from '../indexTableFull';
import DataTableProvider from '../../providers/dataTable';

export interface ISimpleIndexPageProps extends Omit<IIndexTableFullProps, 'id'> {
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

const TableWithControls: FC<ISimpleIndexPageProps> = ({ loading = false, ...props }) => {
  return (
    <Fragment>
      <ShaSpin spinning={loading}>
        <IndexTableFull id={props.tableConfigId} header={props.title} {...props} />
      </ShaSpin>
    </Fragment>
  );
};

const SimpleIndexPagePlain: FC<ISimpleIndexPageProps> = props => (
  <DataTableProvider tableId={props.tableConfigId}>
    <TableWithControls {...props} />
  </DataTableProvider>
);

export default SimpleIndexPagePlain;
