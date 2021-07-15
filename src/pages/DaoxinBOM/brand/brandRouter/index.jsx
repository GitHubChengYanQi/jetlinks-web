/**
 * 品牌表路由文件
 *
 * @author 
 * @Date 2021-07-14 14:19:04
 */

import React, {lazy} from 'react';

export const BrandRouter = [
  {
    path: '/brand',
    component: lazy(() => import('../brandList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
