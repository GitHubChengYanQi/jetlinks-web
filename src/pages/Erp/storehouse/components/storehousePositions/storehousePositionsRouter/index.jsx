/**
 * 仓库库位表路由文件
 *
 * @author song
 * @Date 2021-10-29 09:22:25
 */

import React, {lazy} from 'react';

export const StorehousePositionsRouter = [
  {
    path: '/storehousePositions',
    component: lazy(() => import('../storehousePositionsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
