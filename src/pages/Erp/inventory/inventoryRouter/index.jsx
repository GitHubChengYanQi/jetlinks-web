/**
 * 盘点任务主表路由文件
 *
 * @author Captain_Jazz
 * @Date 2021-12-27 09:27:27
 */

import React, {lazy} from 'react';

export const InventoryRouter = [
  {
    path: '/inventory',
    name:'盘点管理',
    component: lazy(() => import('../inventoryList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
