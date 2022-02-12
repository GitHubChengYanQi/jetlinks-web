/**
 * sop详情路由文件
 *
 * @author song
 * @Date 2022-02-10 09:21:35
 */

import React, {lazy} from 'react';

export const SopDetailRouter = [
  {
    path: '/sopDetail',
    component: lazy(() => import('../sopDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
