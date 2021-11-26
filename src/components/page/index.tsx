import { nanoid } from 'nanoid';
import React, { Fragment, useEffect } from 'react';
import { CancelButton } from '..';
import { useShaRouting, useSheshaApplication } from '../..';
import { IToolbarItem, PageWithLayout } from '../../interfaces';
import { IndexToolbar } from '../indexToolbar';
import Show from '../show';
import PageHeaderTag, { ITagProps } from './pageHeaderTag';

export interface IPageHeadProps {
  readonly title?: string;
  readonly description?: string;
  readonly url?: string;
  readonly ogImage?: string;
}

export interface IPageProps extends IPageHeadProps {
  toolbarItems?: IToolbarItem[];
  backUrl?: string;
  fixedHeading?: boolean;
  breadcrumbItems?: [];
  headerTagList?: ITagProps[];
}

export const Page: PageWithLayout<IPageProps> = ({ children, title, toolbarItems, backUrl, headerTagList }) => {
  const { router } = useShaRouting();
  const { applicationName } = useSheshaApplication();

  useEffect(() => {
    document.title = `${applicationName} | ${title}`;
  }, [applicationName, title]);

  const onBackButtonClick = () => router?.push(backUrl);

  const hasBackUrl = !!backUrl?.trim();

  const hasTagList = !!headerTagList?.length;

  return (
    <section className="sha-page">
      <div className="sha-page-heading">
        <div className="sha-page-heading-left">
          <Show when={!!title?.trim()}>
            <h1 className="sha-page-title">{title}</h1>
          </Show>
        </div>

        <Show when={hasBackUrl || hasTagList}>
          <div className="sha-page-heading-right">
            <Show when={hasTagList}>
              {headerTagList?.map(tag => (
                <PageHeaderTag {...tag} key={nanoid()} />
              ))}
            </Show>

            <Show when={hasBackUrl && hasTagList}>
              <span className="sha-page-heading-right-tag-separator">|</span>
            </Show>

            <Show when={hasBackUrl}>
              <CancelButton onCancel={onBackButtonClick} />
            </Show>
          </div>
        </Show>
      </div>

      <Show when={!!toolbarItems?.length}>{<IndexToolbar items={toolbarItems?.filter(({ hide }) => !hide)} />}</Show>

      <Fragment>{children}</Fragment>
    </section>
  );
};

export default Page;
