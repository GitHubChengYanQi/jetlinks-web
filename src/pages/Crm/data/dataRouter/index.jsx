/**
 * 资料路由文件
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

import React, {lazy} from 'react';

export const DataRouter = [
  {
    path: '/data',
    name:'信息管理',
    component: lazy(() => import('../dataList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
