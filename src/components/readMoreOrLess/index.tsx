import React, { FC } from 'react';
// @ts-ignore
import ReadMoreOrReadLess from 'react-read-more-less';
//  

export interface IReadMoreOrLessProps {
  className?: string;
  charLimit?: number;
  readMoreText?: string;
  readLessText?: string;
  children: string;
}

export const ReadMoreOrLess: FC<IReadMoreOrLessProps> = ({
  className,
  charLimit = 150,
  readMoreText = 'read more',
  readLessText = 'read less',
  children,
}) => (
  <ReadMoreOrReadLess
    className={`read-more-or-less ${className}`}
    charLimit={charLimit}
    readMoreText={readMoreText}
    readLessText={` ${readLessText}`}
  >
    {children || ''}
  </ReadMoreOrReadLess>
);

export default ReadMoreOrLess;
