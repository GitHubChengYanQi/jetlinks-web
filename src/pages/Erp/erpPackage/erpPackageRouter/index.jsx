/**
 * 套餐表路由文件
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {lazy} from 'react';

export const ErpPackageRouter = [
  {
    path: '/erpPackage',
    component: lazy(() => import('../erpPackageList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
