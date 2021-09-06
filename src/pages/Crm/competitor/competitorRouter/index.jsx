/**
 * 竞争对手管理路由文件
 *
 * @author 
 * @Date 2021-09-06 13:44:14
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
