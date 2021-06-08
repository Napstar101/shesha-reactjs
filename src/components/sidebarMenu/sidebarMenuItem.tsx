import { Menu } from 'antd';
import React from 'react';
import { ISidebarMenuItem } from '../../providers/sidebarMenu';
import { ShaLink } from '../shaLink';
import classNames from 'classnames';
import ShaIcon, { IconType } from '../shaIcon';
import { Router } from 'next/router';

const { SubMenu } = Menu;

export const getMenuItemKey = (title: string): string => {
  return title
    ?.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, '');
};

export interface IProps extends ISidebarMenuItem {
  isSubMenu?: boolean;
  isItemVisible: (item: ISidebarMenuItem) => boolean;
  router?: Router;
}

// Note: Have to use function instead of react control. It's a known issue, you can only pass MenuItem or MenuGroup as Menu's children. See https://github.com/ant-design/ant-design/issues/4853
export const renderSidebarMenuItem = (props: IProps) => {
  const { id: key, name: title, icon, childItems, targetUrl: target, isSubMenu } = props;
  const asPath = props.router?.asPath;

  if (!props.isItemVisible(props)) return null;

  const renderedIcon = icon
    ? <ShaIcon iconName={icon as IconType}></ShaIcon>
    : null;

  if (childItems)
    return (
      <SubMenu
        key={key}
        className="is-ant-menu-item"
        title={
          <span>
            {renderedIcon}
            <span>
              <a className="nav-links-renderer" href={target}>
                {title}
              </a>
            </span>
          </span>
        }
      >
        {childItems.map(child => renderSidebarMenuItem({ ...child, isSubMenu: true, isItemVisible: props.isItemVisible, router: props.router }))}
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
      <ShaLink linkTo={target} icon={renderedIcon} displayName={title} />
    </Menu.Item>
  );
};

export default renderSidebarMenuItem;
