/**
 * 货单表路由文件
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {lazy} from 'react';

export const OrderRouter = [
  {
    path: '/order',
    name: '货单管理',
    component: lazy(() => import('../OrderList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];

