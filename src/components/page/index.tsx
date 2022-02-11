import { Breadcrumb, Space, Tag } from 'antd';
import classNames from 'classnames';
import { nanoid } from 'nanoid/non-secure';
import React, { FC, useEffect } from 'react';
import { CancelButton, ShaSpin, StatusLabel } from '..';
import { useShaRouting, useSheshaApplication } from '../..';
import { IToolbarItem } from '../../interfaces';
import { IndexToolbar } from '../indexToolbar';
import Show from '../show';
import PageHeaderTag, { ITagProps } from './pageHeaderTag';
import { useForm } from '../../providers';

export interface IPageHeadProps {
  readonly title?: string;
  readonly description?: string;
  readonly url?: string;
  readonly ogImage?: string;
}

export interface IBreadcrumbItem {
  text: string;
  link?: string;
}

export interface IStatus {
  color?: string;
  visible?: boolean;
  text: string;
}

export interface IPageProps extends IPageHeadProps {
  toolbarItems?: IToolbarItem[];
  backUrl?: string;
  breadcrumbItems?: IBreadcrumbItem[];
  headerTagList?: ITagProps[];
  loading?: boolean;
  noPadding?: boolean;
  loadingText?: string;
  status?: IStatus;
}

export const Page: FC<IPageProps> = ({
  children,
  title,
  toolbarItems,
  backUrl,
  headerTagList,
  loading,
  breadcrumbItems,
  loadingText = 'Loading...',
  noPadding = false,
  status,
}) => {
  const { router } = useShaRouting();
  const { applicationName } = useSheshaApplication();
  const { formMode } = useForm();

  useEffect(() => {
    document.title = `${applicationName} | ${title}`;
  }, [applicationName, title]);

  const onBackButtonClick = () => router?.push(backUrl);

  const hasBackUrl = !!backUrl?.trim();

  const hasTagList = !!headerTagList?.length;

  const showHeading = !!title || hasBackUrl || hasTagList;

  return (
    <section className="sha-page">
      <ShaSpin spinning={loading || false} tip={loadingText}>
        <Show when={showHeading}>
          <div className="sha-page-heading">
            <div className="sha-page-heading-left">
              <Show when={!!title?.trim() || Boolean(status)}>
                <h1 className="sha-page-title">
                  <Space>
                    {title}

                    <Show when={Boolean(status) && (status?.visible || typeof status?.visible !== 'boolean')}>
                      <Tag color={status?.color}>{status?.text}</Tag>
                    </Show>
                  </Space>
                </h1>
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
        </Show>

        <Show when={!!toolbarItems?.length}>{<IndexToolbar items={toolbarItems?.filter(({ hide }) => !hide)} />}</Show>

        <Show when={!!breadcrumbItems?.length}>
          <Breadcrumb className="sha-page-breadcrumb">
            {breadcrumbItems?.map(({ text, link }) => (
              <Breadcrumb.Item>{link ? <a href={link}>{text}</a> : text}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Show>

        <div
          className={classNames('sha-page-content', {
            'no-padding': noPadding,
            'is-designer-mode': formMode === 'designer',
          })}
        >
          {children}
        </div>
      </ShaSpin>
    </section>
  );
};

export default Page;
