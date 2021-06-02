import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ChildDataTable, { IndexTableFull } from './';
import AuthContainer from '../authedContainer';
import DataTableProvider from '../../providers/dataTable';
import { SearchOutlined } from '@ant-design/icons';

import { IShaDataTableProps } from '../..';

export default {
  title: 'Components/IndexTableFull',
  component: ChildDataTable,
  argTypes: {},
} as Meta;

const tableProps: IShaDataTableProps = {
  id: 'Persons_Index',
  header: 'List of People',
  crud: true,
  actionColumns: [{ icon: <SearchOutlined />, onClick: id => {
    alert('clicked row with Id = ' + id);
  } }],
};

// Create a master template for mapping args to render the Button component
const Template: Story<IShaDataTableProps> = args => (
  <AuthContainer>
    <DataTableProvider tableId={args.id} title="Users" {...args}>
      {/* <TableHack></TableHack> */}
      <IndexTableFull {...tableProps} {...args} />
    </DataTableProvider>
  </AuthContainer>
);

export const SimpleChildTable = Template.bind({});
SimpleChildTable.args = { ...tableProps };
