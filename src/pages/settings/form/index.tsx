import React, { FC } from 'react';
import { GenericIndexPageDefault, IIndexTableFullProps, OnSuccessActionType } from '../../../components';
import { IShaDataTableProps } from '../../../interfaces';

import { useCreateForm } from './defaults/utils';

interface IFormsIndexPageProps {
  tableProps?: Omit<IIndexTableFullProps, 'id'>;
}

const FormsIndexPage: FC<IFormsIndexPageProps> = ({ tableProps }) => {
  const tableConfig: IShaDataTableProps = {
    id: 'Forms_Index', // hardcoded for now
    header: 'Forms',
    disableCustomFilters: true,
  };

  return (
    <GenericIndexPageDefault
      createModalProps={{
        title: 'Create Form',
        updater: useCreateForm,
        formPath: `/settings/forms/create`,
        OnSuccessAction: OnSuccessActionType.GoToUrl,
        onSuccessUrl: data => {
          console.log('returnUrlOnSuccess data :>> ', data);

          return `/settings/forms/designer?id=${data?.result?.id}`;
        },
      }}
      detailsUrl={id => `/settings/forms/designer?id=${id}`}
      editUrl={id => `/settings/forms/edit?id=${id}`}
      title="Forms"
      tableConfigId={tableConfig?.id}
      // props for the index table. selected row IDs. Does not expose selectedRowIds
      {...tableConfig}
      tableProps={tableProps}
    />
  );
};

export default FormsIndexPage;
