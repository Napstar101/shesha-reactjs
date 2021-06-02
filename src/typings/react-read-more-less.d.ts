import * as React from 'react';
// @ts-ignore
declare module 'react-read-more-less' {  
  export interface IReadMoreOrLessProps  {
    className?:	string;
    charLimit:	number
    readMoreText: string;
    readLessText: string;
  }
  const ReadMoreOrLess: React.FC<IReadMoreOrLessProps>;
  export default ReadMoreOrLess;
}