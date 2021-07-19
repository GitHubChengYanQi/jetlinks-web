/**
 * 客户管理表路由文件
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React, {lazy} from 'react';

export const ClientRouter = [
  {
    path: '/client',
    component: lazy(() => import('../clientList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
