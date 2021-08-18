import React, {lazy} from 'react';
import baseSystem from './baseSystem';
import CrmRouterConfig from '@/pages/Crm/router';
import ErpRouterConfig from '@/pages/Erp/router';
import BasicLayout from '@/layouts/BasicLayout';
import ProtalRouterConfig from '@/pages/Portal/router';
import ShopRouterConfig from '@/pages/Shop/router';

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
      ...CrmRouterConfig,
      ...ErpRouterConfig,
      ...baseSystem,
      ...ProtalRouterConfig,
      ...ShopRouterConfig,
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
