import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';

interface IProps {}

export const ToolbarWrapper: FC<IProps> = ({ children }) => (
  <div className="toolbar-wrapper" key={uuid()}>
    {children}
  </div>
);

export default ToolbarWrapper;
