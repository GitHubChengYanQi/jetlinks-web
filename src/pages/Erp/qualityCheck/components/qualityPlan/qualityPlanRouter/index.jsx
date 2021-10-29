/**
 * 质检方案路由文件
 *
 * @author Captain_Jazz
 * @Date 2021-10-28 10:29:56
 */

import React, {lazy} from 'react';

export const QualityPlanRouter = [
  {
    path: '/qualityPlan',
    component: lazy(() => import('../qualityPlanList')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
