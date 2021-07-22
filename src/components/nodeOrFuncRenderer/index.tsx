import React, { FC, Fragment, ReactNode } from 'react';

export type ReactNodeOrFunc = ReactNode | (() => ReactNode);

interface INodeOrFuncRendererProps {}

export const NodeOrFuncRenderer: FC<INodeOrFuncRendererProps> = ({ children }) => {
  return <Fragment>{typeof children === 'function' ? children() : children}</Fragment>;
};

export default NodeOrFuncRenderer;
