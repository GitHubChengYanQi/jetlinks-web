import React, {lazy} from 'react';
import BaseSystem from '@/pages/BaseSystem';
import {GenRouter} from '@/pages/BaseSystem/gen/GenRouter';
import {LoginLogRouter} from '@/pages/BaseSystem/loginLog/loginLogRouter';

const systemConfig = [
  {
    path: '/BASE_SYSTEM',
    component: BaseSystem,
    children: [
      ...LoginLogRouter,
      ...GenRouter,
      {
        path: '/mgr',
        component: lazy(() => import('@/pages/BaseSystem/user/UserList')),
        exact: true,
      },
      {
        path: '/role',
        component: lazy(() => import('@/pages/BaseSystem/role/RoleList')),
        exact: true,
      },
      {
        path: '/dept',
        component: lazy(() => import('@/pages/BaseSystem/dept/DeptList')),
        exact: true,
      },
      {
        path: '/position',
        component: lazy(() => import('@/pages/BaseSystem/position/PositionList')),
        exact: true,
      },
      {
        path: '/menu',
        component: lazy(() => import('@/pages/BaseSystem/menu/MenuList')),
        exact: true,
      },
      {
        path: '/dictType',
        component: lazy(() => import('@/pages/BaseSystem/dictType/List')),
        exact: true,
      },
      {
        path: '/dictType/:dictTypeId',
        component: lazy(() => import('@/pages/BaseSystem/dictType/dict/List')),
      },
      {
        path: '/swagger',
        component: lazy(() => import('@/pages/BaseSystem/swagger')),
        exact: true
      },
      {
        path: '/swagger/:module/:action',
        component: lazy(() => import('@/pages/BaseSystem/swagger')),
      },
      {
        redirect: '/BASE_SYSTEM/mgr',
      }
    ]
  },
];
export default systemConfig;
