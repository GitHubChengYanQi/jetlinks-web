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
    name: '材质管理',
    component: lazy(() => import('../MaterialList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
