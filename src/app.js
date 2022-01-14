import React from 'react';
import {runApp} from 'ice';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import LoadingPage from '@/components/LoadingPage';



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
