/**
 * 客户管理表路由文件
 *
 * @author
 * @Date 2021-07-16 12:55:35
 */

import React, {lazy} from 'react';

export const Client = [
  {
    path: '/client',
    component: lazy(() => import('../clientList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
