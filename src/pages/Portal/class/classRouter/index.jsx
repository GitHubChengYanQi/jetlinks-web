/**
 * 分类导航路由文件
 *
 * @author siqiang
 * @Date 2021-08-18 15:53:56
 */

import React, {lazy} from 'react';

export const ClassRouter = [
  {
    path: '/class',
    component: lazy(() => import('../classList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
