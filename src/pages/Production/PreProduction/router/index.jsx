/**
 * 轮播图路由文件
 *
 * @author
 * @Date 2021-08-17 14:05:06
 */

import React, {lazy} from 'react';

export const PreProductionRouter = [
  {
    path: '/preProduction',
    name: '待生产',
    component: lazy(() => import('../List/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
