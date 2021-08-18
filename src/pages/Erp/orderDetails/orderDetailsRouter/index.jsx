/**
 * 订单明细表路由文件
 *
 * @author siqiang
 * @Date 2021-08-18 13:26:29
 */

import React, {lazy} from 'react';

export const OrderDetailsRouter = [
  {
    path: '/orderDetails',
    component: lazy(() => import('../orderDetailsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
