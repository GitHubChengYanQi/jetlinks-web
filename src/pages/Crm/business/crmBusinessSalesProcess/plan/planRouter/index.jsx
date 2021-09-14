/**
 * 路由文件
 *
 * @author song
 * @Date 2021-09-14 14:36:34
 */

import React, {lazy} from 'react';

export const PlanRouter = [
  {
    path: '/plan',
    component: lazy(() => import('../planList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
