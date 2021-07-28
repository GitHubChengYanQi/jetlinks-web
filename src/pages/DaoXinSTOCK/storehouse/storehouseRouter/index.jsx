/**
 * 地点表路由文件
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {lazy} from 'react';

export const PlaceRouter = [
  {
    path: '/storehouse',
    name: '仓库管理',
    component: lazy(() => import('../storehouseList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
