/**
 * 轮播图路由文件
 *
 * @author
 * @Date 2021-08-17 14:05:06
 */

import React, {lazy} from 'react';

export const productionPlanRouter = [
  {
    path: '/productionPlan',
    name: '生产计划',
    component: lazy(() => import('../PlanList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/productionPlan/detail',
    name: '生产计划',
    component: lazy(() => import('../PlanDetail/index')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
