import React, {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import baseSystem from './baseSystem';
import otherRouters from './AppRouters';
import {DaoxinMaterialRouter} from '@/pages/daoxin/daoxinMaterial/daoxinMaterialRouter';
import {ItemsRouter} from '@/pages/daoxin/items/itemsRouter';
import {BrandRouter} from '@/pages/daoxin/brand/brandRouter';
import {PartsRouter} from '@/pages/daoxin/parts/partsRouter';

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
      ...otherRouters,
      ...DaoxinMaterialRouter,
      ...ItemsRouter,
      ...BrandRouter,
      ...PartsRouter,
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
