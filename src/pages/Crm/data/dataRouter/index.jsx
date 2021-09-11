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
    component: lazy(() => import('../dataList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
