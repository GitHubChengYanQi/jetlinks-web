/**
 * 路由文件
 *
 * @author  
 * @Date 2021-08-20 13:14:51
 */

import React, {lazy} from 'react';

export const DeliveryDetailsRouter = [
  {
    path: '/deliveryDetails',
    component: lazy(() => import('../deliveryDetailsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
