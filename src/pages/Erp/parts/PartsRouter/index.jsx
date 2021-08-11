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
    name: '清单管理',
    component: lazy(() => import('../PartsList')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/parts/:id',
    component: lazy(() => import('../PartsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
