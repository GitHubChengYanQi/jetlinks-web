import React, {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import LoadingPage from '@/components/LoadingPage';
import baseSystem from './baseSystem';
import otherRouters from './AppRouters';


const routerConfig = [
  {
    path: '/login',
    component: lazy(() => import('@/pages/Login')),// Login,
    fallback: LoadingPage,
  },
  {
    path: '/',
    component: BasicLayout,
    fallback: LoadingPage,
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
