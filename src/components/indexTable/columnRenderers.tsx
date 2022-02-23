import React from 'react';
import moment from 'moment';
import { ITableCustomTypesRender } from './interfaces';
import { IConfigurableActionColumnsProps } from '../../providers/datatableColumnsConfigurator/models';
import ShaIcon, { IconType } from '../shaIcon';
import { evaluateString } from '../../providers/form/utils';

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
    render: (props, router) => {
      const getActionProps = (data): IConfigurableActionColumnsProps => {
        return data?.column?.actionProps as IConfigurableActionColumnsProps;
      };

      const clickHandler = (event, data) => {
        event.stopPropagation();

        const actionProps = getActionProps(data);
        if (!actionProps) return;

        switch (actionProps.action) {
          case 'navigate': {
            if (actionProps.targetUrl) {
              const preparedUrl =
                actionProps.targetUrl.indexOf('{{') > -1
                  ? evaluateString(actionProps.targetUrl, { selectedRow: data.row.original })
                  : actionProps.targetUrl;

              //router?.push(preparedUrl);
              window.location.href = preparedUrl;
              console.log('prepared url: ' + preparedUrl, router);
              break;
            } else console.warn('tagret Url is not specified');
            break;
          }
          default: {
            console.log(`unknown action: '${actionProps.action}'`);
          }
        }
      };

      const actionProps = getActionProps(props);
      return (
        <a className="sha-link" onClick={e => clickHandler(e, props)}>
          {actionProps.icon && <ShaIcon iconName={actionProps.icon as IconType} />}
        </a>
      );
    },
  },
];
