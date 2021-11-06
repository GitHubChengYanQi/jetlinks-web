import React, {lazy} from 'react';
import CrmRouterConfig from '@/pages/Crm/router';
import ErpRouterConfig from '@/pages/Erp/router';
import BasicLayout from '@/layouts/BasicLayout';
import ProtalRouterConfig from '@/pages/Portal/router';
import ShopRouterConfig from '@/pages/Shop/router';
import UserInfoRouterConfig from '@/pages/UserInfo/router';
import RepairRouterConfig from '@/pages/Repair/router';
import baseSystem from './baseSystem';
import ProductionRouterConfig from '@/pages/PRODUCTION/router';
import SpuRouterConfig from '@/pages/SPU/router';

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
      ...UserInfoRouterConfig,
      ...RepairRouterConfig,
      ...ProductionRouterConfig,
      ...SpuRouterConfig,
      {
        path: '/test',
        component: lazy(() => import('@/pages/Test/index')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        path: '/member',
        component: lazy(() => import(('@/pages/Member'))),
      },
      {
        path: '/',
        component: lazy(() => import(('@/pages/Overview'))),
      },
      {
        component: lazy(() => import(('@/pages/NotFound'))),
      }
    ],
  },
];

export default routerConfig;
