/**
 * 发货表路由文件
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

import React, {lazy} from 'react';

export const DeliveryRouter = [
  {
    path: '/delivery',
    component: lazy(() => import('../deliveryList')),
    fallback: <div>loading...</div>,
    exact: true,
  }, {
    path: '/delivery/:cid',
    name: '发货详细信息',
    component: lazy(() => import('../../deliveryDetails/deliveryDetailsList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
