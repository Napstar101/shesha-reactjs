import { Menu } from 'antd';
import React from 'react';
import { useSidebarMenu } from '../../providers/sidebarMenu';
import { ISidebarMenuItem } from '../../providers/sidebarMenu/models';
import { ShaLink } from '../shaLink';
import classNames from 'classnames';
import { useShaRouting } from '../../providers/shaRouting';

export interface ISidebarMenuItemProps extends ISidebarMenuItem {}

const { SubMenu } = Menu;

export const getMenuItemKey = (title: string): string => {
  return title
    ?.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, '');
};

export interface IProps extends ISidebarMenuItemProps {
  isSubMenu?: boolean;
}

// Note: Have to use function instead of react control. It's a known issue, you can only pass MenuItem or MenuGroup as Menu's children. See https://github.com/ant-design/ant-design/issues/4853
export const renderSidebarMenuItem = (props: IProps) => {
  const { key, title, icon, childItems, target, isSubMenu } = props;
  const { isItemVisible } = useSidebarMenu();
  if (!isItemVisible(props)) return null;

  const { router } = useShaRouting();
  const asPath = router?.asPath;

  if (childItems)
    return (
      <SubMenu
        key={key}
        className="is-ant-menu-item"
        title={
          <span>
            {icon}
            <span>
              <a className="nav-links-renderer" href={target}>
                {title}
              </a>
            </span>
          </span>
        }
      >
        {childItems.map(child => renderSidebarMenuItem({ ...child, isSubMenu: true }))}
      </SubMenu>
    );

  // @ts-ignore
  const currentPath =
    asPath === '/' ? asPath : (asPath ?? '').endsWith('/') ? (asPath || '').substr(0, asPath.length - 1) : asPath;

  return (
    <Menu.Item
      key={key}
      className={classNames({
        'ant-menu-item-selected': currentPath === target,
        'ant-menu-item-is-submenu': isSubMenu,
      })}
      title={title}
    >
      <ShaLink linkTo={target} icon={icon} displayName={title} />
    </Menu.Item>
  );
};

export default renderSidebarMenuItem;
