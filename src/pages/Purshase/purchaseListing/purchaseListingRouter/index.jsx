/**
 * 采购清单路由文件
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {lazy} from 'react';

export const PurchaseListingRouter = [
  {
    path: '/purchaseListing',
    component: lazy(() => import('../purchaseListingList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
