/**
 * 出库表路由文件
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {lazy} from 'react';

export const DeliveryRouter = [
  {
    path: '/delivery',
    component: lazy(() => import('../deliveryList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
