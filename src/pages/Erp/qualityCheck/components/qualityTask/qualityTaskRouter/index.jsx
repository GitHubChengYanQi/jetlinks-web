/**
 * 质检任务路由文件
 *
 * @author 
 * @Date 2021-11-16 09:54:41
 */

import React, {lazy} from 'react';

export const QualityTaskRouter = [
  {
    path: '/qualityTask',
    component: lazy(() => import('../qualityTaskList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
