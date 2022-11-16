import {lazy} from 'react';
import BaseSystem from '@/pages/BaseSystem';

const logConfig = [
  {
    path: '/log',
    name: '设置',
    component: BaseSystem,
    children: [
      {
        path: '/loginLog',
        name: '登录日志',
        component: lazy(() => import('@/pages/log/LoginLog')),
      }, {
        path: '/operationLog',
        name: '操作日志',
        component: lazy(() => import('@/pages/log/OperationLog')),
      }, {
        path: '/deviceLog',
        name: '操作日志',
        component: lazy(() => import('@/pages/log/DeviceLog')),
      },
    ]
  },
];
export default logConfig;
