import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ChildDataTable, { IChildTableProps } from './';
import AuthContainer from '../authedContainer';
import DataTableProvider from '../../providers/dataTable';
import { SearchOutlined } from '@ant-design/icons';
import JobTitleFieldEditor from './jobTitleFieldEditor';
import { ChildTable } from '../..';

export default {
  title: 'Components/ChildDataTable',
  component: ChildDataTable,
  argTypes: {},
} as Meta;

interface IExtendedChildTableProps extends IChildTableProps {
  parentEntityId?: string;
}

const simpleTableProps: IExtendedChildTableProps = {
  parentEntityId: 'ef0916a4-1b25-4587-b73e-006cf79394db',
  id: 'NpoChildOrganisationsForOfficeBearer_Index',
  header: 'List of Staff',
  crud: true,
  actionColumns: [
    {
      icon: <SearchOutlined />,
      // type:
      onClick: id => {
        alert(`clicked details id: ${id}`);
      },
    },
  ],
};

const inlineEditingWithCustomEditorsTableProps: IExtendedChildTableProps = {
  id: 'NpoChildOrganisationsForOfficeBearer_Index',
  parentEntityId: 'ef0916a4-1b25-4587-b73e-006cf79394db',
  header: 'Staff Meeting Custom Editor',
  crud: true,
  customTypeEditors: [
    {
      key: '',
      property: 'JobTitle',
      render: data => <JobTitleFieldEditor {...data} />,
    },
  ],
};

// Create a master template for mapping args to render the Button component
const Template: Story<IExtendedChildTableProps> = args => (
  <AuthContainer>
    <DataTableProvider tableId={args?.id} parentEntityId={args?.parentEntityId}>
      <ChildTable {...args} />
    </DataTableProvider>
  </AuthContainer>
);

export const SimpleChildTable = Template.bind({});
SimpleChildTable.args = { label: 'Simple', ...simpleTableProps };

export const InlineEditingWithCustomRenderer = Template.bind({});
InlineEditingWithCustomRenderer.args = {
  label: 'Custom Editor',
  ...inlineEditingWithCustomEditorsTableProps,
};
