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
    component: lazy(() => import('../stockList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
