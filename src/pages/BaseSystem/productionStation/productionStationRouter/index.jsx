/**
 * 工位表路由文件
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 10:03:24
 */

import React, {lazy} from 'react';

export const ProductionStationRouter = [
  {
    path: '/productionStation',
    component: lazy(() => import('../productionStationList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
