/**
 * 采购计划主表路由文件
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {lazy} from 'react';

export const ProcurementPlanRouter = [
  {
    path: '/procurementPlan',
    name:'采购计划',
    component: lazy(() => import('../procurementPlanList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
