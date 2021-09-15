/**
 * 项目表路由文件
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {lazy} from 'react';

export const BusinessRouter = [
  {
    path: '/business',
    name: '项目管理',
    component: lazy(() => import('../BusinessList')),
    fallback: <div>loading...</div>,
    exact: true,
  },

  {
    path: '/business/:cid',
    name: '项目详情',
    component: lazy(() => import('../BusinessDetails')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/business/:cid/:state',
    name: '项目详情',
    component: lazy(() => import('../BusinessDetails')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
