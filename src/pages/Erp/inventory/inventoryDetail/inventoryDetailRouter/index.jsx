/**
 * 盘点任务详情路由文件
 *
 * @author Captain_Jazz
 * @Date 2021-12-27 09:27:27
 */

import React, {lazy} from 'react';

export const InventoryDetailRouter = [
  {
    path: '/inventoryDetail',
    component: lazy(() => import('../inventoryDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
