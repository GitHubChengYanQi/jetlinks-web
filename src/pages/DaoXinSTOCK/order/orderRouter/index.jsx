/**
 * 发货表路由文件
 *
 * @author 
 * @Date 2021-07-15 17:41:40
 */

import React, {lazy} from 'react';

export const OrderRouter = [
  {
    path: '/order',
    component: lazy(() => import('../orderList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
