import React from 'react';
import {createApp} from 'ice';
import moment from 'moment';
import LoadingPage from '@/components/LoadingPage';


moment.locale('zh-cn');
const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    basename: '/',
    fallback: <LoadingPage />
  }
};
createApp(appConfig);
