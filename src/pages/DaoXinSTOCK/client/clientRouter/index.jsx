/**
 * 客户表路由文件
 *
 * @author 
 * @Date 2021-07-15 17:41:40
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
