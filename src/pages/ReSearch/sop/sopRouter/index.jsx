/**
 * sop主表路由文件
 *
 * @author song
 * @Date 2022-02-10 09:21:35
 */

import React, {lazy} from 'react';

export const SopRouter = [
  {
    path: '/sop',
    name:'作业指导',
    component: lazy(() => import('../sopList')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/sop/:cid',
    name:'作业指导',
    component: lazy(() => import('../sopDetail/sopDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
