/**
 * 仓库产品明细表路由文件
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {lazy} from 'react';

export const StockDetailsRouter = [
  {
    path: '/stockDetails',
    name: '库存明细',
    component: lazy(() => import('../StockDetailsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
