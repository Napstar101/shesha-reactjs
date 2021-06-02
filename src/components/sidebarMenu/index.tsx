import React, { FC } from 'react';
import { Menu } from 'antd';
import renderSidebarMenuItem from './sidebarMenuItem';
import { MenuTheme } from 'antd/lib/menu/MenuContext';
import { useLocalStorage } from '../../hooks';
import { useSidebarMenu } from '../../providers/sidebarMenu';
import { useShaRouting } from '../../providers/shaRouting';

interface ISidebarMenuProps {
  isCollapsed?: boolean;
  theme?: MenuTheme;
}

export const SidebarMenu: FC<ISidebarMenuProps> = ({ theme = 'dark' }) => {
  const [openedKeys, setOpenedKeys] = useLocalStorage('openedSidebarKeys', null);
  const { router } = useShaRouting();
  const { items } = useSidebarMenu();

  const asPath = router?.asPath;

  if ((items ?? []).length === 0) return null;

  const currentPath =
    asPath === '/' ? asPath : (asPath ?? '').endsWith('/') ? (asPath ?? '').substr(0, asPath.length - 1) : asPath;

  const selectedItem = items.find(item => item.target === currentPath);
  const selectedKey = selectedItem?.key;

  const onOpenChange = (openKeys: React.Key[]) => {
    setOpenedKeys(openKeys);
  };

  const keys = openedKeys && openedKeys.length > 0 ? openedKeys : undefined;

  return (
    <Menu
      mode="inline"
      className="nav-links-renderer"
      defaultSelectedKeys={selectedKey ? [selectedKey] : []}
      defaultOpenKeys={keys}
      onOpenChange={onOpenChange}
      theme={theme}
    >
      {items.map(item => renderSidebarMenuItem(item))}
    </Menu>
  );
};

export default SidebarMenu;
