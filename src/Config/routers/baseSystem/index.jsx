import React, { lazy } from 'react';
import BaseSystem from '@/pages/BaseSystem';
import { GenRouter } from '@/pages/BaseSystem/gen/GenRouter';
import { LoginLogRouter } from '@/pages/BaseSystem/loginLog/loginLogRouter';
import { SysDeptRouter } from '@/pages/BaseSystem/sysDept/sysDeptRouter';
import {ConfigRouter} from '@/pages/BaseSystem/config/configRouter';
import WorkflowConfig from '@/pages/Workflow/router';
import {CodingRulesRouter} from '@/pages/BaseSystem/codingRules/codingRulesRouter';

const systemConfig = [
  ...WorkflowConfig,
  {
    path: '/BASE_SYSTEM',
    name: '设置',
    component: BaseSystem,
    children: [
      ...SysDeptRouter,
      ...LoginLogRouter,
      ...GenRouter,
      ...ConfigRouter,
      ...CodingRulesRouter,
      {
        path: '/mgr',
        name: '用户管理',
        component: lazy(() => import('@/pages/BaseSystem/user/UserList')),
        exact: true,
      },
      {
        path: '/role',
        name: '用户管理',
        component: lazy(() => import('@/pages/BaseSystem/role/RoleList')),
        exact: true,
      },
      {
        path: '/dept',
        name: '部门管理',
        component: lazy(() => import('@/pages/BaseSystem/dept/DeptList')),
        exact: true,
      },
      {
        path: '/position',
        name: '职位管理',
        component: lazy(() => import('@/pages/BaseSystem/position/PositionList')),
        exact: true,
      },
      {
        path: '/menu',
        name: '菜单管理',
        component: lazy(() => import('@/pages/BaseSystem/menu/MenuList')),
        exact: true,
      },

      {
        path: '/dictType',
        name:'字典管理',
        component: lazy(() => import('@/pages/BaseSystem/dictType/List')),
        exact: true,
      },
      {
        path: '/dictType/:dictTypeId',
        name:'字典管理',
        component: lazy(() => import('@/pages/BaseSystem/dictType/dict/List')),
      },
      {
        path: '/swagger',
        name: '接口文档',
        component: lazy(() => import('@/pages/BaseSystem/swagger')),
        exact: true
      },
      {
        path: '/swagger/:module/:action',
        name: '接口文档',
        component: lazy(() => import('@/pages/BaseSystem/swagger')),
      },
      {
        redirect: '/BASE_SYSTEM/mgr',
      }
    ]
  },
];
export default systemConfig;
