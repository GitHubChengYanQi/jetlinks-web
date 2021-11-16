/**
 * 质检任务详情路由文件
 *
 * @author 
 * @Date 2021-11-16 09:54:41
 */

import React, {lazy} from 'react';

export const QualityTaskDetailRouter = [
  {
    path: '/qualityTaskDetail',
    component: lazy(() => import('../qualityTaskDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
