/**
 * 路由文件
 *
 * @author song
 * @Date 2022-02-24 14:55:10
 */

import React, {lazy} from 'react';

export const BankRouter = [
  {
    path: '/bank',
    component: lazy(() => import('../bankList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
