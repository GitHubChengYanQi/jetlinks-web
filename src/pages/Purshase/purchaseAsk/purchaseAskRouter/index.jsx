/**
 * 采购申请路由文件
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {lazy} from 'react';

export const PurchaseAskRouter = [
  {
    path: '/purchaseAsk',
    name: '采购申请',
    component: lazy(() => import('../purchaseAskList')),
    fallback: <div>loading...</div>,
    exact: true,
  }, {
    path: '/purchaseAsk/add',
    name: '采购申请',
    component: lazy(() => import('../purchaseAskEdit')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
