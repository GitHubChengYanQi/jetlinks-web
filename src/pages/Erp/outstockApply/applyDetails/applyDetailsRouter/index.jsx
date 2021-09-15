/**
 * 路由文件
 *
 * @author song
 * @Date 2021-09-15 09:42:47
 */

import React, {lazy} from 'react';

export const ApplyDetailsRouter = [
  {
    path: '/applyDetails',
    component: lazy(() => import('../applyDetailsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
