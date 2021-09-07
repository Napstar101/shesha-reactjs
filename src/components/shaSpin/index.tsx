import React, { FC, PropsWithChildren } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface IShaSpin {
  spinning?: boolean;
  spinIconSize?: number;
  tip?: string;
}

export const ShaSpin: FC<PropsWithChildren<IShaSpin>> = ({ children, spinning, spinIconSize = 24, tip }) => (
  <Spin
    className="sha-spin"
    spinning={spinning}
    indicator={<LoadingOutlined style={{ fontSize: spinIconSize }} spin />}
    tip={tip}
  >
    {children}
  </Spin>
);

export default ShaSpin;
