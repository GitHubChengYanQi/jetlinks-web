/**
 * 工位绑定表路由文件
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 10:03:24
 */

import React, {lazy} from 'react';

export const ProductionStationBindRouter = [
  {
    path: '/productionStationBind',
    component: lazy(() => import('../productionStationBindList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
