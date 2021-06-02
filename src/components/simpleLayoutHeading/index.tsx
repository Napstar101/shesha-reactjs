import React, { CSSProperties, FC } from 'react';
import LayoutHeading from '../layoutHeading';

interface ILayoutHeadingProps {
  title?: string;
  style?: CSSProperties;
  className?: string;
}

export const SimpleLayoutHeading: FC<ILayoutHeadingProps> = props => <LayoutHeading {...props} />;

export default SimpleLayoutHeading;
