/**
 * 仓库总表路由文件
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {lazy} from 'react';

export const StockRouter = [
  {
    path: '/stock',
    name: '库存管理',
    component: lazy(() => import('../StockList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
