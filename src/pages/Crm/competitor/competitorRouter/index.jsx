/**
 * 路由文件
 *
 * @author 
 * @Date 2021-09-07 09:50:09
 */

import React, {lazy} from 'react';

export const CompetitorRouter = [
  {
    path: '/competitor',
    component: lazy(() => import('../competitorList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
