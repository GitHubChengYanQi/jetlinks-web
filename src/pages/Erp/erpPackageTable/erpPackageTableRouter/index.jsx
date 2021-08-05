/**
 * 套餐分表路由文件
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {lazy} from 'react';

export const ErpPackageTableRouter = [
  {
    path: '/erpPackageTable',
    component: lazy(() => import('../erpPackageTableList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
