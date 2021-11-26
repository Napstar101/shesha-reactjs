import React, { ReactNode, useEffect } from 'react';
import { PageWithLayout } from '../../interfaces';

export interface IPageProps {
  title?: string;
  header?: ReactNode;
  toolbarItems?: [];
  backUrl?: string;
  fixedHeading?: boolean;
  breadcrumbItems?: [];
}

export const Page: PageWithLayout<IPageProps> = ({ children, title }) => {
  useEffect(() => {
    document.title = title || '';
  });

  return <section>{children}</section>;
};

export default Page;
