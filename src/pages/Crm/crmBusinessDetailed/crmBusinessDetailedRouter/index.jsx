/**
 * 商机明细表路由文件
 *
 * @author qr
 * @Date 2021-08-04 13:17:57
 */

import React, {lazy} from 'react';

export const CrmBusinessDetailedRouter = [
  {
    path: '/crmBusinessDetailed',
    component: lazy(() => import('../crmBusinessDetailedList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
