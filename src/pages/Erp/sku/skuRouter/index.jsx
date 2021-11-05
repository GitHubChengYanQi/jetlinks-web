/**
 * sku表路由文件
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {lazy} from 'react';

export const SkuRouter = [
  {
    path: '/sku',
    component: lazy(() => import('../skuList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
