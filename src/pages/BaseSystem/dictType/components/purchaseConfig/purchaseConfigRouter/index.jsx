/**
 * 采购配置表路由文件
 *
 * @author 
 * @Date 2021-12-21 13:39:47
 */

import React, {lazy} from 'react';

export const PurchaseConfigRouter = [
  {
    path: '/purchaseConfig',
    component: lazy(() => import('../purchaseConfigList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
