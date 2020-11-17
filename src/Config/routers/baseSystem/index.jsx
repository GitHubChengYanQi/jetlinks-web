import React, {lazy} from 'react';
import BaseSystem from '@/pages/BaseSystem';

const systemConfig = [
  {
    path: '/BASE_SYSTEM',
    component: BaseSystem,
    children:[
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
        redirect:'/BASE_SYSTEM/mgr',
      }
    ]
  },
];
export default systemConfig;
