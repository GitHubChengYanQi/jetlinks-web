/**
 * 供应商黑名单路由文件
 *
 * @author Captian_Jazz
 * @Date 2021-12-20 11:20:05
 */

import React, {lazy} from 'react';

export const SupplierBlacklistRouter = [
  {
    path: '/supplierBlacklist',
    component: lazy(() => import('../supplierBlacklistList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
