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
    component: lazy(() => import('../instockList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
