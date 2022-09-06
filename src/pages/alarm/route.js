import {lazy} from 'react';
import BaseSystem from '@/pages/BaseSystem';

const alarmConfig = [
  {
    path: '/alarm',
    name: '报警管理',
    component: BaseSystem,
    children: [
      {
        path: '/record',
        name: '报警记录',
        component: lazy(() => import('@/pages/alarm/Record')),
      },
      {
        redirect: '/alarm/record',
      }
    ]
  },
];
export default alarmConfig;
