/**
 * 来源表路由文件
 *
 * @author
 * @Date 2021-07-19 17:59:08
 */

import React, {lazy} from 'react';

export const SourceRouter = [
  {
    path: '/origin',
    name: '商机来源',
    component: lazy(() => import('../originList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
