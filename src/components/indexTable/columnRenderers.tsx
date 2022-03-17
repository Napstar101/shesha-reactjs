import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ITableCustomTypesRender } from './interfaces';
import { IConfigurableActionColumnsProps } from '../../providers/datatableColumnsConfigurator/models';
import ShaIcon, { IconType } from '../shaIcon';
import { evaluateString } from '../../providers/form/utils';
import { useDataTable, useModal, useShaRouting } from '../../providers';
import camelCaseKeys from 'camelcase-keys';
import { message, Modal, notification } from 'antd';
import { useGet, useMutate } from 'restful-react';
import { IModalProps } from '../../providers/dynamicModal/models';
import ValidationErrors from '../validationErrors';

export const renderers: ITableCustomTypesRender[] = [
  {
    key: 'string',
    render: props => {
      return props.value;
    },
  },
  {
    key: 'number',
    render: props => {
      return props.value;
    },
  },
  {
    key: 'date',
    render: props => {
      return props.value ? moment(props.value).format('DD/MM/YYYY') : null;
    },
  },
  {
    key: 'datetime',
    render: props => {
      return props.value ? moment(props.value).format('DD/MM/YYYY HH:mm') : null;
    },
  },
  {
    key: 'boolean',
    render: props => {
      return props.value ? 'Yes' : 'No';
    },
  },
  {
    key: 'duration',
    render: props => {
      const time = props.value ? moment(props.value, 'HH:mm:ss') : null;
      return time && time.isValid ? time.format('HH:mm:ss') : null;
    },
  },
  {
    key: 'refList',
    render: props => {
      return typeof props?.value === 'object' ? props?.value?.item : props?.value ?? null;
    },
  },
  {
    key: 'entityReference',
    render: props => {
      return typeof props?.value === 'object' ? props?.value?.displayText : props?.value ?? null;
    },
  },
  {
    key: 'action',
    render: props => {
      const { router } = useShaRouting();
      const { crudConfig, refreshTable } = useDataTable();

      const { mutate: deleteRowHttp } = useMutate({
        verb: 'DELETE',
        path: crudConfig?.deleteUrl,
      });

      const [state, setState] = useState<{
        modalProps?: IModalProps;
        entityId?: string;
        entity?: any;
        additionalProperties?: any; // These props will be passed as initialization properties to the modal
      }>({});

      const { refetch: fetchEntity, loading, data: fetchEntityResponse, error: fetchEntityError } = useGet({
        path: crudConfig?.detailsUrl || '',
        queryParams: { id: state?.entityId },
        lazy: true,
      });

      const dynamicModal = useModal({ ...state?.modalProps, initialValues: state?.entity });

      useEffect(() => {
        if (state?.entityId) {
          fetchEntity();
        }
      }, [state?.entityId]);

      useEffect(() => {
        if (!loading && fetchEntityResponse) {
          setState(prev => ({ ...prev, entity: fetchEntityResponse?.result }));
        }
      }, [loading]);

      useEffect(() => {
        if (state?.entity && state?.modalProps) {
          dynamicModal?.open();
        }
      }, [state?.entity]);

      useEffect(() => {
        if (fetchEntityError) {
          notification.error({ message: <ValidationErrors error={fetchEntityError} renderMode="raw" /> });
        }
      }, [fetchEntityError]);

      const resetModalProps = () => {
        setState({});
      };

      const getActionProps = (data): IConfigurableActionColumnsProps => {
        return data?.column?.actionProps as IConfigurableActionColumnsProps;
      };

      const getRowData = data => {
        return data?.cell?.row?.original;
      };

      const handleDeleteRowClick = (id: string) => {
        const deletingLoader = message.loading('Action in progress..', 0);

        deleteRowHttp('', { queryParams: { id } })
          .then(() => {
            refreshTable();
          })
          .catch(() => {
            message.error('Sorry, and error has occurred. Please try again later');
          })
          .finally(deletingLoader);
      };

      const clickHandler = (event, data) => {
        event.stopPropagation();

        const actionProps = getActionProps(data);

        const selectedRow = getRowData(data);

        if (!actionProps) return;

        switch (actionProps.action) {
          case 'navigate': {
            if (actionProps.targetUrl) {
              const preparedUrl =
                actionProps.targetUrl.indexOf('{{') > -1
                  ? evaluateString(actionProps.targetUrl, { selectedRow: data.row.original })
                  : actionProps.targetUrl;

              if (typeof router === 'object') {
                try {
                  router?.push(preparedUrl);
                } catch (error) {
                  window.location.href = preparedUrl;
                }
              } else {
                window.location.href = preparedUrl;
              }
              break;
            } else console.warn('target Url is not specified');
            break;
          }
          case 'editRow': {
            const convertedProps = actionProps as Omit<IModalProps, 'formId'>;

            const modalProps = {
              id: selectedRow?.Id, // link modal to the current form component by id
              isVisible: false,
              formId: actionProps.modalFormId,
              title: actionProps.modalTitle,
              initialValues: selectedRow ? camelCaseKeys(selectedRow) : selectedRow,
              showModalFooter: convertedProps?.showModalFooter,
              submitHttpVerb: convertedProps?.submitHttpVerb,
              width: actionProps?.modalWidth,
              destroyOnClose: true,

              onSubmitted: () => {
                refreshTable();
                resetModalProps();
              },
            };

            setState(prev => ({ ...prev, modalProps, entityId: selectedRow?.Id }));

            break;
          }
          case 'deleteRow': {
            Modal.confirm({
              title: 'Delete item?',
              content: actionProps?.deleteWarningMessage || 'Are you sure you want to delete this item?',
              okText: 'Delete',
              okButtonProps: {
                type: 'primary',
                danger: true,
              },
              onOk: handleDeleteRowClick,
            });

            break;
          }
          default: {
            console.log(`unknown action: '${actionProps.action}'`);
          }
        }
      };

      const aProps = getActionProps(props);
      return (
        <a className="sha-link" onClick={e => clickHandler(e, props)}>
          {aProps.icon && <ShaIcon iconName={aProps.icon as IconType} />}
        </a>
      );
    },
  },
];
