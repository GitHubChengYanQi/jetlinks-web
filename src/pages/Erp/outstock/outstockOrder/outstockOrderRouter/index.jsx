/**
 * 出库单路由文件
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {lazy} from 'react';

export const OutstockOrderRouter = [
  {
    path: '/outstockOrder',
    component: lazy(() => import('../outstockOrderList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
