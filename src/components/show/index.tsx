import React, { useMemo, FC, Fragment, PropsWithChildren } from 'react';

export interface IShowProps {
  when: boolean;
}

/**
 * Use <Show> for conditional logic. It takes a singular when prop for a condition to match for. When the condition is truthy, the children will render, otherwise they will not
 */
export const Show: FC<PropsWithChildren<IShowProps>> = ({ children, when = false }) => {
  const memoizedWhen = useMemo(() => when, [when]);

  return memoizedWhen ? <Fragment>{children}</Fragment> : null;
};

export default Show;
