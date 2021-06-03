import 'antd/dist/antd.css';
import '../src/styles/index.less';
// import '../dist/styles.css';
import React from 'react';
import { RestfulProvider } from 'restful-react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  // layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
};

export const decorators = [
  Story => (
    <RestfulProvider base="http://testdsdnpobe.boxfusion.co.za">
      <Story />
    </RestfulProvider>
  ),
];
