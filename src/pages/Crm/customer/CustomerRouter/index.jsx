/**
 * 客户管理表路由文件
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy} from 'react';

export const  CustomerRouter = [
  {
    path: '/customer',
    name: '客户管理',
    component: lazy(() => import('../CustomerList')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/customer/add/:cid',
    name: '客户管理',
    component: lazy(() => import('../CustomerEdit')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/customer/detail/:cid',
    name: '客户管理',
    component: lazy(() => import('../CustomerDetail')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
