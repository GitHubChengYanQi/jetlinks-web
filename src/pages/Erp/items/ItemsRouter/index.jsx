/**
 * 产品表路由文件
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React, {lazy} from 'react';

export const ItemsRouter = [
  {
    path: '/items',
    name: '产品管理',
    component: lazy(() => import('../ItemsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
