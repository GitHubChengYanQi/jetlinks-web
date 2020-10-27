import React, {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import Login from "@/pages/Login";
import otherRouters from './AppRouters';

const routerConfig = [
  {
    path: '/login',
    component: Login,
    fallback: <div>loading...</div>,
  },
  {
    path: '/',
    component: BasicLayout,
    fallback: <div>loading...</div>,
    children: [
      ...otherRouters
    ],
  },
];

export default routerConfig;
