import React from 'react';
import {createApp} from 'ice';
import moment from 'moment';

moment.locale('zh-cn');
const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    basename: '/',
    fallback: <div>loading...</div>
  }
};
createApp(appConfig);
