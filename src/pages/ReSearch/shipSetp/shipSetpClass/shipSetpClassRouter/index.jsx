/**
 * 工序分类表路由文件
 *
 * @author Captain_Jazz
 * @Date 2022-02-10 15:06:02
 */

import React, {lazy} from 'react';

export const ShipSetpClassRouter = [
  {
    path: '/shipSetpClass',
    component: lazy(() => import('../shipSetpClassList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
