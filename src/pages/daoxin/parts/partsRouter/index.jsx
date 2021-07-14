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
    component: lazy(() => import('../partsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
