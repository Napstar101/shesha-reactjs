import React, { useState } from 'react';
import moment from 'moment';
import { ITableCustomTypesRender } from './interfaces';
import { IConfigurableActionColumnsProps } from '../../providers/datatableColumnsConfigurator/models';
import ShaIcon, { IconType } from '../shaIcon';
import { evaluateString } from '../../providers/form/utils';
import { useDataTable, useDataTableSelection, useModal, useShaRouting } from '../../providers';
import camelCaseKeys from 'camelcase-keys';

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
      const [state, setState] = useState(false);
      const { selectedRow } = useDataTableSelection();
      const {} = useDataTable();

      const dynamicModal = useModal({
        id: props.id, // link modal to the current form component by id
        isVisible: false,
        formId: props.modalFormId,
        title: props.modalTitle,
        initialValues: selectedRow ? camelCaseKeys(selectedRow) : selectedRow,
        showModalFooter: true, // Make it configurable
        submitHttpVerb: 'PUT', // Make it configurable
      });

      const getActionProps = (data): IConfigurableActionColumnsProps => {
        return data?.column?.actionProps as IConfigurableActionColumnsProps;
      };

      const clickHandler = (event, data) => {
        event.stopPropagation();

        const actionProps = getActionProps(data);

        if (actionProps?.action === 'deleteRow' || actionProps?.action === 'editRow') {
          console.log('props, selectedRow :>> ', props, selectedRow);
        }

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
            } else console.warn('tagret Url is not specified');
            break;
          }
          case 'editRow': {
            dynamicModal?.open();
            break;
          }
          case 'deleteRow': {
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
