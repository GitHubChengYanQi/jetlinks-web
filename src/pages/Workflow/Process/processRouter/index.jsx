/**
 * 流程主表路由文件
 *
 * @author c
 * @Date 2021-11-19 10:58:01
 */

import React, {lazy} from 'react';

export const ProcessRouter = [
  {
    path: '/process',
    component: lazy(() => import('../processList')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/process/:cid',
    component: lazy(() => import('../components/WorkflowAdd')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
