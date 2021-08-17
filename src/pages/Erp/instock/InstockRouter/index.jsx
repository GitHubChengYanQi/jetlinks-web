/**
 * 入库表路由文件
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {lazy} from 'react';

export const InstockRouter = [
  {
    path: '/instock',
    name: '入库管理',
    component: lazy(() => import('../InstockList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
