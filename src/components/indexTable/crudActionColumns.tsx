import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { ITableActionColumns } from './interfaces';

export const crudActionColumns: ITableActionColumns[] = [
  {
    icon: <EditOutlined />, // Edit
    type: 'update',
  },
  {
    icon: <DeleteOutlined />,
    type: 'delete',
  },
  {
    icon: <CheckOutlined />, // Save
    type: 'create',
  },
  {
    icon: <CloseOutlined />,
    type: 'cancel',
  },
];
