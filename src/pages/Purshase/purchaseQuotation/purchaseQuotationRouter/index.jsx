/**
 * 采购报价表单路由文件
 *
 * @author Captain_Jazz
 * @Date 2021-12-22 11:17:27
 */

import React, {lazy} from 'react';

export const PurchaseQuotationRouter = [
  {
    path: '/purchaseQuotation',
    name:'报价管理',
    component: lazy(() => import('../purchaseQuotationList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
