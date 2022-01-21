/**
 * 库位绑定物料表路由文件
 *
 * @author song
 * @Date 2022-01-20 11:15:05
 */

import React, {lazy} from 'react';

export const StorehousePositionsBindRouter = [
  {
    path: '/storehousePositionsBind',
    component: lazy(() => import('../storehousePositionsBindList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
