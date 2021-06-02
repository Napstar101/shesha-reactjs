import moment from 'moment';
import { ITableCustomTypesRender } from './interfaces';

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
];
