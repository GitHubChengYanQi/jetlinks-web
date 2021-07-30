/**
 * 客户级别表路由文件
 *
 * @author 
 * @Date 2021-07-30 13:00:02
 */

import React, {lazy} from 'react';

export const CrmCustomerLevelRouter = [
  {
    path: '/crmCustomerLevel',
    component: lazy(() => import('../crmCustomerLevelList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
