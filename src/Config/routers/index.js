import React, {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import baseSystem from './baseSystem';
import logConfig from '@/pages/log/route';
import systemManageConfig from '@/pages/systemManage/route';
import equipmentConfig from '@/pages/equipment/route';
import alarmConfig from '@/pages/alarm/route';


const routerConfig = [
  {
    path: '/login',
    name: '登录',
    component: lazy(() => import(('@/pages/Login'))),// Login,
  },
  {
    path: '/logout',
    component: lazy(() => import(('@/pages/Logout'))),
  },
  {
    path: '/',
    name: 'Home',
    component: BasicLayout,
    children: [
      ...baseSystem,
      ...logConfig,
      ...systemManageConfig,
      ...equipmentConfig,
      ...alarmConfig,
      {
        path: '/monitor',
        component: lazy(() => import(('@/pages/monitor'))),
      }, {
        path: '/member',
        component: lazy(() => import(('@/pages/Member'))),
      },
      {
        component: lazy(() => import(('@/pages/NotFound'))),
      }
    ],
  },
];

export default routerConfig;
