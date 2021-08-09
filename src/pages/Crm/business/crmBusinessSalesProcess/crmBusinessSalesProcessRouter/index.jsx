/**
 * 销售流程路由文件
 *
 * @author 
 * @Date 2021-08-02 15:47:16
 */

import React, {lazy} from 'react';

export const CrmBusinessSalesProcessRouter = [
  {
    path: '/crmBusinessSalesProcess',
    component: lazy(() => import('../crmBusinessSalesProcessList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
