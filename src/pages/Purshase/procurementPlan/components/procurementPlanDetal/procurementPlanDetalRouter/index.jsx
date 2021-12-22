/**
 * 采购计划单子表整合数据后的子表路由文件
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {lazy} from 'react';

export const ProcurementPlanDetalRouter = [
  {
    path: '/procurementPlanDetal',
    component: lazy(() => import('../procurementPlanDetalList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
