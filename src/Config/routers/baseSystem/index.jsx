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
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        path: '/role',
        component: lazy(() => import('@/pages/BaseSystem/role/RoleList')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        path: '/dept',
        component: lazy(() => import('@/pages/BaseSystem/dept/DeptList')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        path: '/position',
        component: lazy(() => import('@/pages/BaseSystem/position/PositionList')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        path: '/menu',
        component: lazy(() => import('@/pages/BaseSystem/menu/MenuList')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        path: '/dictType',
        component: lazy(() => import('@/pages/BaseSystem/dictType/List')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        path: '/dictType/:dictTypeId',
        component: lazy(() => import('@/pages/BaseSystem/dictType/dict/List')),
        fallback: <div>loading...</div>,
      },
      {
        path: '/swagger',
        component: lazy(() => import('@/pages/BaseSystem/swagger')),
        fallback: <div>loading...</div>,
      },
      {
        redirect: '/BASE_SYSTEM/mgr',
      }
    ]
  },
];
export default systemConfig;
