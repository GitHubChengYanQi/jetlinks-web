/**
 * 质检分类表路由文件
 *
 * @author song
 * @Date 2021-10-27 13:08:57
 */

import React, {lazy} from 'react';

export const QualityCheckClassificationRouter = [
  {
    path: '/qualityCheckClassification',
    component: lazy(() => import('../qualityCheckClassificationList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
