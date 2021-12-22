/**
 * 路由文件
 *
 * @author 
 * @Date 2021-12-21 11:29:07
 */

import React, {lazy} from 'react';

export const TaxRateRouter = [
  {
    path: '/taxRate',
    component: lazy(() => import('../taxRateList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
