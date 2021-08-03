/**
 * 销售路由文件
 *
 * @author 
 * @Date 2021-08-02 15:47:16
 */

import React, {lazy} from 'react';

export const CrmBusinessSalesRouter = [
  {
    path: '/crmBusinessSales',
    component: lazy(() => import('../crmBusinessSalesList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
