/**
 * 路由文件
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React, {lazy} from 'react';

export const ProcurementOrderDetailRouter = [
  {
    path: '/procurementOrderDetail',
    component: lazy(() => import('../procurementOrderDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
