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
    name: '物料管理',
    component: lazy(() => import('../skuList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }, {
    path: '/sku/:cid',
    name:'物料管理',
    component: lazy(() => import('../SkuDetail')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
