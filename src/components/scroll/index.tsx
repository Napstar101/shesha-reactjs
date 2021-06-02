import React, { FC, PropsWithChildren } from 'react';
import classnames from 'classnames';

interface IScrollProps {
  scrollX?: boolean;
  scrollY?: boolean;
}

export const Scroll: FC<PropsWithChildren<IScrollProps>> = ({ children, scrollX, scrollY }) => (
  <div className={classnames('scroll', { 'scroll-x': scrollX }, { 'scroll-y': scrollY })}>{children}</div>
);

export default Scroll;
