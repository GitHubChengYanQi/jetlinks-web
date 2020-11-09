import React, {lazy} from 'react';

const systemConfig = [
  {
    path: '/setting',
    redirect: '/setting/system/user',
    exact: true,
  },
  {
    path: '/setting/system',
    redirect: '/setting/system/user',
    exact: true,
  },
  // 用户管理
  {
    path: '/setting/system/user',
    exact: true,
    redirect: '/setting/system/user/list',
  },

  // 角色管理
  {
    path: '/setting/system/role',
    exact: true,
    redirect: '/setting/system/role/list',
  },
  {
    path: '/setting/system/role/list',
    exact: true,
    component: lazy(() => import('@/pages/setting/system/role/RoleList')),
  },
  // 部门管理
  {
    path: '/setting/system/dept',
    exact: true,
    redirect: '/setting/system/dept/list',
  },
  {
    path: '/setting/system/dept/list',
    exact: true,
    component: lazy(() => import('@/pages/setting/system/dept/DeptList')),
  },
  // 职位管理
  {
    path: '/setting/system/position',
    exact: true,
    redirect: '/setting/system/position/list',
  },
  {
    path: '/setting/system/position/list',
    exact: true,
    component: lazy(() => import('@/pages/setting/system/position/PositionList')),
  },
  {
    path: '/setting/system/menu',
    redirect:'/setting/system/menu/list',
    exact: true,
  },
  {
    path: '/setting/system/menu/list',
    exact: true,
    component: lazy(() => import('@/pages/setting/system/menu/MenuList')),
  },
  {
    path: '/',
    component: lazy(() => import('@/pages/Home')),
  },
];
export default systemConfig;
