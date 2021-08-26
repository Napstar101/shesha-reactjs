import React, { FC, useRef, useEffect, useState, Fragment, MutableRefObject, useMemo } from 'react';
import { Column, SortingRule, TableProps } from 'react-table';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ICrudProps } from '../../providers/dataTable/interfaces';
import { useShaRouting } from '../../providers/shaRouting';
import { IColumnEditFieldProps, IShaDataTableProps, ITableActionColumns } from './interfaces';
import { renderers } from './columnRenderers';
import { useMutate } from 'restful-react';
import ColumnEditField from './columnEditField';
import ColumnDetailsField from './columnDetailsField';
import { Form, Modal } from 'antd';
import { crudActionColumns } from './crudActionColumns';
import { DataTableFullInstance } from '../../providers/dataTable/contexts';
import { ModalProps } from 'antd/lib/modal';
import { nanoid } from 'nanoid';
import ReactTable from '../reactTable';
import { removeUndefinedProperties } from '../../utils/array';
import { ValidationErrors } from '..';
import { useAuthState, useDataTableStore } from '../../providers';
import { IReactTableProps } from '../reactTable/interfaces';

const FormItem = Form.Item;

const CRUD_MODAL_WIDTH = 700;

interface IIndexTableProps extends IShaDataTableProps, ICrudProps, TableProps {
  tableRef?: MutableRefObject<Partial<DataTableFullInstance> | null>;
}

export interface IExtendedModalProps extends ModalProps {
  content?: string;
}

export const IndexTable: FC<Partial<IIndexTableProps>> = ({
  crud,
  saveLocally,
  useMultiselect,
  actionColumns,
  selectedRowIndex,
  onSelectRow,
  onDblClick,
  customTypeRenders,
  customTypeEditors,
  tableRef,
  crudMode = 'inline',
  onRowsChanged,
  onExportSuccess,
  onExportError
}) => {
  const store = useDataTableStore();
  const { headers } = useAuthState();

  if (tableRef) tableRef.current = store;

  const { router } = useShaRouting();

  const {
    tableData,
    isFetchingTableData,
    totalPages,
    columns,
    pageSizeOptions,
    currentPage,
    selectedPageSize,
    tableFilter,
    onSelectRow: onSelectRowDeprecated,
    onDblClick: onDblClickDeprecated,
    selectedRow,
    parentEntityId,
    tableSorting,
    quickSearch,
    crudConfig,
    refreshTable,
    newOrEditableRowData,
    setCrudRowData,
    cancelCreateOrEditRowData,
    updateLocalTableData,
    deleteRowItem,
    succeeded: {
      exportToExcel: exportToExcelSuccess
    },
    error: {
      exportToExcel: exportToExcelError
    },
  } = useDataTableStore();

  if (exportToExcelSuccess && onExportSuccess) {
    onExportSuccess();
  }

  if (exportToExcelError && onExportError) {
    onExportError();
  }

  const [preparedColumns, setPreparedColumns] = useState<Column<any>[]>([]);

  const [confirmModalProps, setConfirmModalProps] = useState<IExtendedModalProps>({});

  const { mutate: createItemHttp, loading: isCreating, error: createError } = useMutate({
    path: crudConfig?.createUrl,
    verb: 'POST',
    requestOptions: { headers },
  });

  const { mutate: updateItemHttp, loading: isUpdating, error: updateError } = useMutate({
    path: crudConfig?.updateUrl,
    verb: 'PUT',
    requestOptions: { headers },
  });

  const { mutate: deleteItemHttp, loading: isDeleting, error: deleteError } = useMutate({
    path: crudConfig?.deleteUrl,
    verb: 'DELETE',
    requestOptions: { headers },
  });

  const table = useDataTableStore();

  const handleGenericChange = (key: string, value: any) => {
    const obj = newOrEditableRowData?.data || {};
    obj[key] = value;
    setCrudRowData({ ...newOrEditableRowData, data: obj });
  };

  const handleGenericChangeRef = useRef(handleGenericChange);

  const newOrEditableRowDataRef = useRef(newOrEditableRowData);

  useEffect(() => {
    handleGenericChangeRef.current = handleGenericChange;
  }, []);

  useEffect(() => {
    newOrEditableRowDataRef.current = newOrEditableRowData;
  }, [newOrEditableRowData]);

  const handleSelectRow = onSelectRow || onSelectRowDeprecated;
  const dblClickHandler = onDblClick || onDblClickDeprecated;

  useEffect(() => {
    if (Boolean(handleSelectRow)) handleSelectRow(null, null);
  }, [
    tableData,
    isFetchingTableData,
    totalPages,
    columns,
    pageSizeOptions,
    currentPage,
    selectedPageSize,
    tableFilter,
    dblClickHandler,
    selectedRow,
    parentEntityId,
    quickSearch,
    tableSorting,
  ]);

  useEffect(() => {
    if (onRowsChanged) {
      onRowsChanged(tableData);
    }
  }, [tableData]);

  const selectedObject = newOrEditableRowDataRef?.current?.data;

  const selectedObjectRef = useRef(selectedObject);

  useEffect(() => {
    selectedObjectRef.current = selectedObject || {};
  }, [selectedObject]);

  // console.log('crudMode: ', newOrEditableRowData);

  // We are making sure that we only update the columns
  useEffect(() => {
    const localPreparedColumns = columns
      .filter(({ show }) => show)
      .map<Column<any>>(columnItem => {
      return {
        ...columnItem,
        Header: columnItem.header,
        minWidth: columnItem.minWidth,
        maxWidth: columnItem.maxWidth,
        width: undefined,
        resizable: true,
        Cell: props => {
          const allRenderers = [...(customTypeRenders || []), ...renderers];

          const _data = newOrEditableRowDataRef?.current?.data || {};

          if (props?.row?.original?.Id === newOrEditableRowData?.id && crudMode === 'inline') {
            const editProps: IColumnEditFieldProps = {
              id: columnItem?.id,
              dataType: columnItem?.dataType,
              name: columnItem.id,
              caption: columnItem.caption,
              onChange: handleGenericChange,
              value: _data[columnItem?.id],
              referenceListName: columnItem?.referenceListName,
              referenceListNamespace: columnItem?.referenceListNamespace,
              entityReferenceTypeShortAlias: columnItem?.entityReferenceTypeShortAlias,
            };

            if (customTypeEditors?.length) {
              for (const customEditor of customTypeEditors) {
                const { property, render } = customEditor;

                if (columnItem?.id === property) {
                  return render(editProps) || null;
                }
              }
            }

            return <ColumnEditField {...editProps} />;
          }

          // Allow the user to override the default render behavior of the table without having to make changes to it
          if (allRenderers) {
            for (const customRender of allRenderers) {
              const { key, render } = customRender;

              if (columnItem.dataType === key || columnItem.customDataType === key) {
                return render(props) || null;
              }
            }
          }
          
          return props.value || null;
        },
      };
    });

    const allActionColumns = [...(actionColumns || []), ...(crud ? crudActionColumns : [])];

    // Now add a list of urls
    allActionColumns
      ?.filter(d => {
        let show = !!(Boolean(d?.onClick) || d?.type);

        if (crud) {
          const isCreateOrEditMode = newOrEditableRowData?.mode === 'create' || newOrEditableRowData?.mode === 'edit';
          const isSaveOrCancelType = d.type === 'create' || d?.type === 'cancel';
          const isDeleteOrUpdate = d.type === 'delete' || d?.type === 'update';

          // If mode is create or edit, hide details and delete
          if (isCreateOrEditMode) {
            if (!isSaveOrCancelType) {
              show = false;
            }
          } else {
            if (!isDeleteOrUpdate) {
              show = false;
            }
          }
        }

        return show;
      })
      ?.reverse()
      ?.forEach(data => {
        // @ts-ignore
        const clickHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, props: any) => {
          event.preventDefault();
          const currentId = props?.row?.original?.Id;

          if (data?.type === 'update') {
            const callback = () =>
              setCrudRowData({
                id: currentId,
                data: props?.original,
                mode: 'edit',
              });

            // If you were creating or already editing something
            if (newOrEditableRowData?.id && newOrEditableRowData?.id !== currentId) {
              confirmAndProceed('Please note that you will lose data you have not yet saved', callback);
            } else {
              callback();
            }
          }

          if (data?.type === 'delete') {
            deleteItem(currentId);
          }

          if (data?.type === 'create') {
            createOrUpdateItem();
          }

          if (data?.type === 'cancel') {
            confirmAndProceed('Please note that you will lose data you have not yet saved', cancelCreateOrEditRowData);
          }

          // The user wants to view the details using the modal
          if (data?.type === 'read' && !data?.onClick) {
            setCrudRowData({
              id: currentId,
              mode: 'read',
              data: props.original,
            });
          }

          if (data?.onClick) {
            const result = data.onClick(currentId, table);

            if (typeof result === 'string') router?.push(result);
          }
        };

        // I'm assigning a random accessor because with react-table v
        const accessor = nanoid();

        localPreparedColumns.unshift({
          accessor,
          id: accessor, // This needs to be fixed
          Header: '',
          width: 35,
          minWidth: 35,
          maxWidth: 35,
          disableSortBy: true,
          disableResizing: true,
          Cell: props => {
            return (
              <a className="sha-link" onClick={e => clickHandler(e, props)}>
                {getDefaultActionColumns(data)}
              </a>
            );
          },
        });
      });

    setPreparedColumns(localPreparedColumns);
  }, [columns, newOrEditableRowData?.id]);

  /**
   * Returns a default action column icon
   *
   * I want to give the user the freedom to simply specify the type of action column without also forcing them to always specify it.
   * Usually with CRUD action, we can predict the icon, hence it's optional
   */
  const getDefaultActionColumns = (column: ITableActionColumns) => {
    if (column?.icon) return column?.icon;

    switch (column?.type) {
      case 'cancel':
        return <CloseOutlined />;
      case 'create':
        return <CheckOutlined />;
      case 'delete':
        return <DeleteOutlined />;
      case 'read':
        return <SearchOutlined />;
      case 'update':
        return <EditOutlined />;

      default:
        return <QuestionCircleOutlined />;
    }
  };

  //#region CRUD helpers
  const hideModal = () => setConfirmModalProps({});

  // In here I'm show Modal because Modal.confirm, for some reason, it's not closing
  const confirmAndProceed = (confirmationMessage: string, callback: () => void) => {
    const onOk = () => {
      callback();
      hideModal();
    };
    setConfirmModalProps({ content: confirmationMessage, onOk, visible: true });
  };

  const deleteItem = (itemId: string) => {
    console.log('deleteItem itemId', itemId);

    const deleteCallback = saveLocally
      ? () => deleteRowItem(itemId)
      : () => {
          {
            deleteItemHttp('', {
              queryParams: { id: itemId },
            })
              .then(() => {
                cancelCreateOrEditRowData();
                refreshTable();
              })
              .catch(() => {
                console.log('Delete error');
              });
          }
        };

    confirmAndProceed(
      'Are you sure you want to delete this item. Please note this action cannot be reversed?',
      deleteCallback
    );
  };

  const createOrUpdateItem = () => {
    if (saveLocally) {
      updateLocalTableData();
    } else {
      let mutateHttp = updateItemHttp;
      let payload = newOrEditableRowData?.data;
      payload.parentEntity = { id: parentEntityId };

      if (newOrEditableRowData?.mode === 'create') {
        mutateHttp = createItemHttp;

        delete payload.Id; // Remove the id because we are saving a new one
      }

      mutateHttp(payload)
        .then(() => {
          cancelCreateOrEditRowData();
          refreshTable();
        })
        .catch(errorObj => console.log(errorObj));
    }
  };
  //#endregion

  // const onFetchData = (state: any) => {
  //   const payload: IGetDataPayload = {
  //     id: tableId,
  //     pageSize: state.pageSize,
  //     currentPage: state.page + 1, // starts from 0
  //     sorting: state.sorted,
  //     quickSearch: state.quickSearch,
  //     filter: tableFilter,
  //   };
  //   fetchTableData(payload);
  // };

  // sort
  const defaultSorting = tableSorting
    ? tableSorting.map<SortingRule<string>>(c => ({ id: c.id, desc: c.desc }))
    : columns
        .filter(c => c.defaultSorting != null)
        .map<SortingRule<string>>(c => ({ id: c.id, desc: c.defaultSorting === 1 }));

  const isLoading = isFetchingTableData || isCreating || isUpdating || isDeleting;

  const data =
    newOrEditableRowData && crudMode === 'inline'
      ? newOrEditableRowData?.mode === 'create'
        ? [newOrEditableRowData?.data, ...tableData]
        : tableData
      : tableData;

  const memoizedColumns = useMemo(() => {
    return columns?.filter(({ isVisible, isHiddenByDefault }) => isVisible && !isHiddenByDefault);
  }, [columns]);

  const tableProps: IReactTableProps = {
    // ref: reactTableRef,
    data,
    defaultSorting,
    useMultiSelect: useMultiselect,
    disableSortBy: Boolean(newOrEditableRowData?.id),
    onSelectRow,
    onRowDoubleClick: dblClickHandler,
    columns: preparedColumns?.map(column => {
      const cleanedColumn = removeUndefinedProperties(column);

      return cleanedColumn as Column<any>;
    }),
    selectedRowIndex,
    // onFetchData,
    loading: isLoading,
    // minRows: 0, // to hide empty rows
    pageCount: totalPages,
    manualFilters: true, // informs React Table that you'll be handling sorting and pagination server-side
    manualPagination: true, // informs React Table that you'll be handling sorting and pagination server-side
    // pageSizeOptions,
    // pageIndex: currentPage ? currentPage - 1 : currentPage,
    loadingText: (
      <span>
        <LoadingOutlined /> loading...
      </span>
    ),
    // pageSize: selectedPageSize,
  };

  const renderConfirmDialog = () => {
    /* For some strange reasons, the modal is not closing when the visible property is set false, hence this hack
     * I started by using Modal.confirm and that's when I realized this issue. Will investigate later
     */

    if (confirmModalProps?.visible) {
      return (
        <Modal
          title="Please confirm"
          {...confirmModalProps}
          // icon={<ExclamationCircleOutlined />}
          okText="Proceed"
          onCancel={hideModal}
        >
          <p>{confirmModalProps?.content}</p>
        </Modal>
      );
    }

    return null;
  };

  const EditModal = useMemo(() => {
    return (
      <Modal
        title="Capture Details"
        okText="Save"
        onCancel={cancelCreateOrEditRowData}
        onOk={createOrUpdateItem}
        visible={crudMode === 'dialog' && Boolean(newOrEditableRowData?.id)}
        key="captureEntityDetailsModal"
        width={CRUD_MODAL_WIDTH}
        okButtonProps={{ loading: isCreating }}
      >
        <Form
          {...{
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          }}
        >
          {memoizedColumns.map(
            ({ id, caption, dataType, referenceListName, referenceListNamespace, entityReferenceTypeShortAlias }) => {
              const editProps: IColumnEditFieldProps = {
                id: id,
                dataType: dataType,
                name: id,
                caption: caption,
                onChange: handleGenericChange,
                value: selectedObject && selectedObject[id],
                referenceListName: referenceListName,
                referenceListNamespace: referenceListNamespace,
                entityReferenceTypeShortAlias: entityReferenceTypeShortAlias,
              };

              if (customTypeEditors?.length) {
                for (const customEditor of customTypeEditors) {
                  const { property, render } = customEditor;

                  if (id === property) {
                    return render(editProps);
                  }
                }
              }

              return (
                <FormItem label={caption} key={nanoid()}>
                  <ColumnEditField {...editProps} />
                </FormItem>
              );
            }
          )}
        </Form>
      </Modal>
    );
  }, [crudMode, newOrEditableRowData?.id]);

  const renderDetails = () => {
    return (
      <Modal
        title="Details"
        onCancel={cancelCreateOrEditRowData}
        onOk={cancelCreateOrEditRowData}
        visible={Boolean(newOrEditableRowData?.id) && newOrEditableRowData?.mode === 'read'}
        key="displayEntityDetailsModal"
        width={CRUD_MODAL_WIDTH}
      >
        <Form
          {...{
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          }}
        >
          {memoizedColumns.map(({ id, caption, dataType }) => {
            return (
              <FormItem label={caption} key={nanoid()}>
                <ColumnDetailsField
                  dataType={dataType}
                  value={newOrEditableRowData && newOrEditableRowData?.data[id]}
                />
              </FormItem>
            );
          })}
        </Form>
      </Modal>
    );
  };

  return (
    <Fragment>
      <div className="sha-child-table-error-container">
        <ValidationErrors error={createError?.data} />
        <ValidationErrors error={updateError?.data} />
        <ValidationErrors error={deleteError?.data} />
        {exportToExcelError && <ValidationErrors error={"Error occurred while exporting to excel"} />}
      </div>

      {/* {useMultiselect ? <MultiselectWithState {...tableProps} /> : <ReactTable {...tableProps} />} */}
      <ReactTable {...tableProps} />

      {renderConfirmDialog()}

      {EditModal}

      {renderDetails()}
    </Fragment>
  );
};

export default IndexTable;