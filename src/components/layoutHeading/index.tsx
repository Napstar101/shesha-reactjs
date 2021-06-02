import classNames from 'classnames';
import React, { CSSProperties, FC, ReactNode } from 'react';

interface ILayoutHeadingProps {
  extra?: ReactNode | (() => ReactNode);
  title?: string;
  style?: CSSProperties;
  className?: string;
}

export const LayoutHeading: FC<ILayoutHeadingProps> = ({ title, extra, style, className }) => (
  <div className={classNames('sha-layout-heading-content', className)} style={style}>
    <h1 className="sha-layout-heading-title">{title}</h1>

    <div>{typeof extra === 'function' ? extra() : extra}</div>
  </div>
);

export default LayoutHeading;
