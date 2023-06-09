import {lazy} from 'react';
import BaseSystem from '@/pages/BaseSystem';

const systemManageConfig = [
  {
    path: '/system',
    name: '设置',
    component: BaseSystem,
    children: [
      {
        path: '/configuration',
        name: '系统配置',
        component: lazy(() => import('@/pages/systemManage/Configuration')),
      },
      {
        path: '/tenant',
        name: '租户管理',
        component: lazy(() => import('@/pages/systemManage/Tenant')),
      },
      {
        path: '/role',
        name: '角色管理',
        component: lazy(() => import('@/pages/systemManage/Role')),
      },
      {
        path: '/account',
        name: '账号管理',
        component: lazy(() => import('@/pages/systemManage/Account')),
      },
    ]
  },
];
export default systemManageConfig;
