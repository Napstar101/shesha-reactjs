import React from 'react';
import { GenericIndexPageDefault, OnSuccessActionType } from '../../../components';
import { IShaDataTableProps } from '../../../interfaces';

import { useCreateForm } from './defaults/utils';

const FormsIndexPage = () => {
  const tableProps: IShaDataTableProps = {
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
      // tableProps={{}}
      // tableRef
      detailsUrl={id => `/settings/forms/designer?id=${id}`}
      editUrl={id => `/settings/forms/edit?id=${id}`}
      title="Forms"
      tableConfigId={tableProps?.id}
      // props for the index table. selected row IDs. Does not expose selectedRowIds
      {...tableProps}
    />
  );
};

export default FormsIndexPage;
