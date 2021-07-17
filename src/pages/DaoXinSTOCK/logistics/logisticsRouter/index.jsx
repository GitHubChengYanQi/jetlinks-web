/**
 * 物流表路由文件
 *
 * @author 
 * @Date 2021-07-15 17:41:40
 */

import React, {lazy} from 'react';

export const LogisticsRouter = [
  {
    path: '/logistics',
    component: lazy(() => import('../logisticsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
