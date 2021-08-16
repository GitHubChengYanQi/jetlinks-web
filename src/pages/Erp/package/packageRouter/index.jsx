/**
 * 套餐表路由文件
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {lazy} from 'react';

export const PackageRouter = [
  {
    name: '套餐管理',
    path: '/package',
    component: lazy(() => import('../packageList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
