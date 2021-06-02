import React, { FC, PropsWithChildren } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface IShaSpin {
  spinning?: boolean;
  spinIconSize?: number;
}

export const ShaSpin: FC<PropsWithChildren<IShaSpin>> = ({ children, spinning, spinIconSize = 24 }) => (
  <Spin
    className="sha-spin"
    spinning={spinning}
    indicator={<LoadingOutlined style={{ fontSize: spinIconSize }} spin />}
  >
    {children}
  </Spin>
);

export default ShaSpin;
