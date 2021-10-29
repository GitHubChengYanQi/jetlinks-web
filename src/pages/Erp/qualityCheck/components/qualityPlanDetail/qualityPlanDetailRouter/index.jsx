/**
 * 质检方案详情路由文件
 *
 * @author Captain_Jazz
 * @Date 2021-10-28 10:29:56
 */

import React, {lazy} from 'react';

export const QualityPlanDetailRouter = [
  {
    path: '/qualityPlanDetail',
    component: lazy(() => import('../qualityPlanDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
