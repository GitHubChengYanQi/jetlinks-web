/**
 * 来源表路由文件
 *
 * @author
 * @Date 2021-07-19 17:59:08
 */

import React, {lazy} from 'react';

export const OriginRouter = [
  {
    path: '/origin',
    name: '项目来源',
    component: lazy(() => import('../OriginList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
