/**
 * 物品分类表路由文件
 *
 * @author 
 * @Date 2021-10-18 10:54:16
 */

import React, {lazy} from 'react';

export const CategoryRouter = [
  {
    path: '/category',
    component: lazy(() => import('../categoryList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
