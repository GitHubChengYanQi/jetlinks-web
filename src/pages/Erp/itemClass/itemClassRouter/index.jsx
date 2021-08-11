/**
 * 产品分类表路由文件
 *
 * @author cheng
 * @Date 2021-08-11 15:37:57
 */

import React, {lazy} from 'react';

export const ItemClassRouter = [
  {
    path: '/itemClass',
    component: lazy(() => import('../itemClassList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
