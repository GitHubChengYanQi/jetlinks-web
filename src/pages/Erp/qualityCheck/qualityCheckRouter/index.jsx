/**
 * 质检表路由文件
 *
 * @author song
 * @Date 2021-10-27 13:08:57
 */

import React, {lazy} from 'react';

export const QualityCheckRouter = [
  {
    path: '/qualityCheck',
    component: lazy(() => import('../qualityCheckList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }, {
    path: '/qualityCheck/add',
    component: lazy(() => import('../components/qualityPlan/qualityPlanEdit')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
