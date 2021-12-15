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
    component: lazy(() => import('../purchaseAskList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
