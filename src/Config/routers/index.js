import React, {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import bomRouterConfig from '@/pages/DaoxinBOM/router';
import STOCKRouterConfig from '@/pages/DaoXinSTOCK/router';
import baseSystem from './baseSystem';
import otherRouters from './AppRouters';
import ClientRouterConfig from '@/pages/DaoxinClient/router';
import {ClientRouter} from '@/pages/DaoxinClient/client/clientRouter';

const routerConfig = [
  {
    path: '/login',
    name: '登录',
    component: lazy(() => import((`@/pages/Login`))),// Login,
  },
  {
    path: '/logout',
    component: lazy(() => import((`@/pages/Logout`))),
  },
  {
    path: '/',
    name: 'Home',
    component: BasicLayout,
    children: [
      ...ClientRouterConfig,
      ...STOCKRouterConfig,
      ...baseSystem,
      ...bomRouterConfig,
      ...otherRouters,
      {
        path: '/member',
        component: lazy(() => import((`@/pages/Member`))),
      },
      {
        component: lazy(() => import((`@/pages/NotFound`))),
      }
    ],
  },
];

export default routerConfig;
