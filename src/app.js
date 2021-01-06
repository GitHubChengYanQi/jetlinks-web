import React from 'react';
import { createApp } from 'ice';
import moment from 'moment';
import LoadingPage from '@/components/LoadingPage';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

moment.locale('zh-cn');
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
createApp(appConfig);
