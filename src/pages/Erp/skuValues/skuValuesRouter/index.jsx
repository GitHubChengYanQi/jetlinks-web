/**
 * sku详情表路由文件
 *
 * @author 
 * @Date 2021-10-18 14:14:21
 */

import React, {lazy} from 'react';

export const SkuValuesRouter = [
  {
    path: '/skuValues',
    component: lazy(() => import('../skuValuesList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
