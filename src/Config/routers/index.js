import React, {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import baseSystem from './baseSystem';
import bomRouterConfig from '@/pages/DaoxinBOM/router';
import STOCKRouterConfig from '@/pages/DaoXinSTOCK/router';
import BusinessRouterConfig from '@/pages/DaoXinBusiness/router';
import ContracRouterConfig from '@/pages/DaoxinContrac/router';
import OrderRouterConfig from '@/pages/DaoxinOrder/router';
import ClientRouterConfig from '@/pages/DaoXinClient/router';
import CrmRouterConfig from '@/pages/Crm/router';

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
      ...OrderRouterConfig,
      // ...ClientRouterConfig,
      ...ContracRouterConfig,
      ...STOCKRouterConfig,
      ...baseSystem,
      ...bomRouterConfig,
      ...BusinessRouterConfig,
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
