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
        path: '/contact',
        name: '报警联系人',
        component: lazy(() => import('@/pages/alarm/Contacts')),
      },
      {
        path: '/rule',
        name: '报警规则',
        component: lazy(() => import('@/pages/alarm/Rule')),
      },
    ]
  },
];

export default alarmConfig;
