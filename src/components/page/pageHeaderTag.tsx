import { useMemo } from '@storybook/addons';
import { Tag, TagProps } from 'antd';
import React, { FC } from 'react';

type Tag = {
  text: string;
} & TagProps;

export interface ITagProps {
  title?: string;
  tag: string | Tag;
}

export const PageHeaderTag: FC<ITagProps> = ({ title, tag }) => {
  const memoizedTag = useMemo(() => {
    if (typeof tag === 'string') {
      return <span>{tag}</span>;
    }
    const { text, ...tagProps } = tag;

    return <Tag {...tagProps}>{text}</Tag>;
  }, [title, tag]);

  return (
    <span className="page-header-tags">
      <span className="page-header-tags-title">
        <strong>{title}</strong>
      </span>

      <span className="page-header-tags-tag">{memoizedTag}</span>
    </span>
  );
};

export default PageHeaderTag;
