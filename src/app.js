import React from 'react';
import {createApp, runApp} from 'ice';
import LoadingPage from '@/components/LoadingPage';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

const appConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => {
      return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
    }
  },
  router: {
    basename: '/',
    fallback: <LoadingPage/>
  },

};
runApp(appConfig);
