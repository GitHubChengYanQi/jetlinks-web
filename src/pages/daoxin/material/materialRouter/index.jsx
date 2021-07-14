/**
 * 材质路由文件
 *
 * @author cheng
 * @Date 2021-07-14 15:56:05
 */

import React, {lazy} from 'react';

export const MaterialRouter = [
  {
    path: '/material',
    component: lazy(() => import('../materialList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
