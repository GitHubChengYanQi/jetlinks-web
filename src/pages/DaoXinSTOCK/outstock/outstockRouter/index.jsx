/**
 * 出库表路由文件
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {lazy} from 'react';

export const OutstockRouter = [
  {
    path: '/outstock',
    name: '出库管理',
    component: lazy(() => import('../outstockList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
