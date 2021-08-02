/**
 * 销售路由文件
 *
 * @author 
 * @Date 2021-07-31 13:28:44
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
