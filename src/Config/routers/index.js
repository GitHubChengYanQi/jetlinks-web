import React, {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import Login from '@/pages/Login';
import baseSystem from './baseSystem';
import otherRouters from './AppRouters';

const routerConfig = [
  {
    path: '/login',
    component: lazy(() => import('@/pages/Login')),// Login,
    fallback: <div>loading...</div>,
  },
  {
    path: '/',
    component: BasicLayout,
    fallback: <div>loading...</div>,
    children: [
      ...baseSystem,
      ...otherRouters,
      {
        component: lazy(() => import('@/pages/NotFound')),
      }
    ],
  },
];

export default routerConfig;
