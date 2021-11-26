import React, { FC, PropsWithChildren } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import DefaultLayoutHeader from './defaultLayoutHeader';
import { MenuTheme } from 'antd/lib/menu/MenuContext';
import { IHtmlHeadProps } from '../htmlHead';
import { withAuth } from '../../hocs';
import { useSidebarMenuDefaults } from '../../providers/sidebarMenu';
import ConfigurableSidebarMenu from '../configurableSidebarMenu';
import { useLocalStorage } from '../..';

const { Header, Content, Sider } = Layout;

export interface IMenuTriggerProps {
  collapsed: boolean;
}

const MenuTrigger: FC<IMenuTriggerProps> = ({ collapsed }) => {
  return <span>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>;
};

export interface IDefaultLayoutProps extends IHtmlHeadProps {
  theme?: MenuTheme;
}

// TODO: Check if including props from the layout will
// TODO not cause the app to misbehave, especially when navigating to other pages the layout

const DefaultLayout: FC<PropsWithChildren<IDefaultLayoutProps>> = ({ children, theme = 'dark' }) => {
  const sidebarDefaults = useSidebarMenuDefaults();
  const sidebarDefaultItems = sidebarDefaults?.items || [];

  const [collapsed, setCollapsed] = useLocalStorage('SIDEBAR_COLLAPSE', true);

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={<MenuTrigger collapsed={collapsed} />}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          paddingTop: '48px',
          left: 0,
        }}
        theme={theme}
      >
        <ConfigurableSidebarMenu
          theme={theme}
          id="9362F11A-EA9C-4152-9855-9516123467F7"
          defaultSettings={{ items: sidebarDefaultItems }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <DefaultLayoutHeader collapsed={collapsed} />
        </Header>

        <Content className={classNames({ collapsed })}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default withAuth(DefaultLayout);
