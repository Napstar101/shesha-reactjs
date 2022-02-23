import React, { FC, PropsWithChildren } from 'react';
import { ShaApplicationProvider, SidebarMenuDefaultsProvider } from '../../providers';
import AuthContainer from '../authedContainer';

const DEFAULT_ROUTER = {
  route: '',
  pathname: '',
  query: {},
  asPath: '',
  basePath: '',
  components: {},
  sde: {},
  clc: null,
  pageLoader: undefined,
  push(url: string) {
    return new Promise((resolve) => {
      if (url) {
        resolve(true);
      }
    });
  },
};

export const StoryApp: FC<PropsWithChildren<any>> = ({ children }) => {
  console.log('render StoryApp');

  const renderChildren = () => {
    try {
      const getLayout = (children as Array<any>)[0]?.type?.getLayout;

      return typeof getLayout === 'function' ? getLayout(children) : children;
    } catch (error) {
      return children;
    }
  };

  return (
    <ShaApplicationProvider backendUrl={process.env.STORYBOOK_BASE_URL || ''} router={DEFAULT_ROUTER as any}>
      <AuthContainer layout>
        <SidebarMenuDefaultsProvider items={[]}>{renderChildren()}</SidebarMenuDefaultsProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export default StoryApp;