/**
 * 客户管理表路由文件
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy} from 'react';

export const  CustomerRouter = [
  {
    path: '/customer',
    component: lazy(() => import('../clientList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
