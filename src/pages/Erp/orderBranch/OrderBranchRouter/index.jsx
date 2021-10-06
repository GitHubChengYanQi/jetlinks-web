/**
 * 货单分表路由文件
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {lazy} from 'react';

export const OrderBranchRouter = [
  {
    path: '/orderBranch',
    name: '付款详情',
    component: lazy(() => import('../OrderBranchList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
