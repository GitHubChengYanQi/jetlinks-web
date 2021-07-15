import React, {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import baseSystem from './baseSystem';
import otherRouters from './AppRouters';
import bomRouterConfig from '@/pages/DaoxinBOM/router';
import {StockRouter} from '@/pages/DaoxinBOM/stock/stockRouter';
import {PlaceRouter} from '@/pages/DaoxinBOM/place/placeRouter';

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
