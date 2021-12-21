/**
 * 供应商供应物料路由文件
 *
 * @author song
 * @Date 2021-12-20 10:08:44
 */

import React, {lazy} from 'react';

export const SupplyRouter = [
  {
    path: '/supply',
    component: lazy(() => import('../supplyList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
