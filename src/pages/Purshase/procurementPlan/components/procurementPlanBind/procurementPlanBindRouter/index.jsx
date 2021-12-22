/**
 * 路由文件
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {lazy} from 'react';

export const ProcurementPlanBindRouter = [
  {
    path: '/procurementPlanBind',
    component: lazy(() => import('../procurementPlanBindList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
