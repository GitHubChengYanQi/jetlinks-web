/**
 * 路由文件
 *
 * @author Captain_Jazz
 * @Date 2022-03-15 08:54:48
 */

import React, {lazy} from 'react';

export const CommonMediaRouter = [
  {
    path: '/commonMedia',
    component: lazy(() => import('../commonMediaList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
