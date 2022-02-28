/**
 * 清单路由文件
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {lazy} from 'react';

export const PartsRouter = [
  {
    path: '/parts',
    component: lazy(() => import('../PartsList')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/parts/show',
    component: lazy(() => import('../components/ShowBOM/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
