/**
 * 工序表路由文件
 *
 * @author Captain_Jazz
 * @Date 2022-02-10 15:06:02
 */

import React, {lazy} from 'react';

export const ShipSetpRouter = [
  {
    path: '/shipSetp',
    name:'工序管理',
    component: lazy(() => import('../shipSetpList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
