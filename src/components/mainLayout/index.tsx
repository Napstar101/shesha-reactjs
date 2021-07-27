import React, { CSSProperties, FC, Fragment, PropsWithChildren, ReactNode, useMemo, useState, useEffect } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import LayoutHeader from './header';
import { MenuTheme } from 'antd/lib/menu/MenuContext';
import IdleTimerRenderer from '../idleTimerRenderer';
import NodeOrFuncRenderer, { ReactNodeOrFunc } from '../nodeOrFuncRenderer';
import { /*HtmlHead,*/ IHtmlHeadProps } from '../htmlHead';
import LayoutHeading from '../layoutHeading';
import SidebarMenu from '../sidebarMenu';

const { Header, Content, Footer, Sider } = Layout;

interface IMenuTriggerProps {
  collapsed: boolean;
}

const MenuTrigger: FC<IMenuTriggerProps> = ({ collapsed }) => {
  return <span>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>;
};

interface IMainLayoutProps extends IHtmlHeadProps {
  breadcrumb?: ReactNodeOrFunc;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  layoutBackgroundStyle?: CSSProperties;
  footerStyle?: CSSProperties;
  footer?: ReactNodeOrFunc;
  heading?: ReactNodeOrFunc;
  theme?: MenuTheme;
  fixHeading?: boolean;
  showHeading?: boolean;
  noPadding?: boolean;
  toolbar?: ReactNodeOrFunc;

  /**
   * @deprecated
   * Use headerControls instead
   */
  reference?: string;

  /**
   * Used to display the statuses of the entity as well as the reference numbers
   */
  headerControls?: ReactNodeOrFunc;
}

const MainLayout: FC<PropsWithChildren<IMainLayoutProps>> = ({
  title,
  // description,
  // ogImage,
  // url,
  breadcrumb,
  children,
  style,
  headerStyle,
  contentStyle,
  layoutBackgroundStyle,
  footer,
  footerStyle,
  theme = 'dark',
  heading,
  fixHeading = false,
  showHeading = true,
  reference,
  noPadding = false,
  toolbar,
  headerControls,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    document.title = title || '';
  });

  const hasHeading = useMemo(() => {
    return Boolean(heading);
  }, [heading]);

  const isFixedHeading = useMemo(() => {
    return fixHeading && ((Boolean(title) && showHeading) || Boolean(heading));
  }, [heading, title, heading, showHeading]);

  const renderPageControls = () => {
    if (!headerControls && !reference) return null;
    return (
      <span style={{ minWidth: 'fit-content', margin: '0', marginRight: '1%' }}>
        <NodeOrFuncRenderer>{headerControls || reference}</NodeOrFuncRenderer>
      </span>
    );
  };

  const headingClass = {
    'has-heading': hasHeading || (Boolean(title) && showHeading),
    'fixed-heading': isFixedHeading,
  };

  // If there's a title but there's no heading, render a Simple heading component
  const renderPageTitle = (): ReactNode => {
    if (hasHeading) {
      return typeof heading === 'function' ? heading() : heading;
    }

    if (title && showHeading) {
      return <LayoutHeading title={title} />;
    }

    return <Fragment />;
  };

  return (
    <Layout style={style}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={<MenuTrigger collapsed={collapsed} />}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        theme={theme}
      >
        <SidebarMenu theme={theme} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={headerStyle}>
          <LayoutHeader collapsed={collapsed} />
        </Header>
        <Content className={classNames({ collapsed })} style={contentStyle}>
          {breadcrumb}
          <div className={classNames('sha-layout-heading', headingClass)}>
            {renderPageTitle()} {renderPageControls()}
          </div>

          <div
            className={classNames('sha-site-layout-background', headingClass, {
              'sha-site-layout-background-no-padding': noPadding,
            })}
            style={layoutBackgroundStyle}
          >
            {toolbar && (
              <div className="sha-site-layout-toolbar">
                <NodeOrFuncRenderer>{toolbar}</NodeOrFuncRenderer>
              </div>
            )}

            {children}
          </div>
        </Content>

        {footer && (
          <Footer style={footerStyle}>
            <NodeOrFuncRenderer>{footer}</NodeOrFuncRenderer>
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

// Pass Wrap it around AuthProvider
const AuthenticatedLayout: FC<IMainLayoutProps> = props => {
  return (
    <>
      <MainLayout {...props} />
    </>
  );
  return (
    <IdleTimerRenderer>
      <MainLayout {...props} />
    </IdleTimerRenderer>
  );
};

export default AuthenticatedLayout;
