/**
 * 工序表路由文件
 *
 * @author Captain_Jazz
 * @Date 2022-02-10 15:06:02
 */

import React, {lazy} from 'react';

export const ProcessRouteRouter = [
  {
    path: '/processRoute',
    name:'工艺管理',
    component: lazy(() => import('../ProcessRouteList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/processRoute/:cid',
    name:'工艺管理',
    component: lazy(() => import('../../Detail/index')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
