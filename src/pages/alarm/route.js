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
      {
        path: '/alarmProject',
        name: '报警项设置',
        component: lazy(() => import('@/pages/alarm/AlarmProject')),
      },{
        path: '/ContactGroup',
        name: '报警联系组',
        component: lazy(() => import('@/pages/alarm/ContactGroup/List/index')),
      },{
        path: '/ContactGroupEdit',
        name: '报警联系组',
        component: lazy(() => import('@/pages/alarm/ContactGroup/Edit')),
      },
    ]
  },
];

export default alarmConfig;
