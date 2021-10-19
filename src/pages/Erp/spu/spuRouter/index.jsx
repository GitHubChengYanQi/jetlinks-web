/**
 * 路由文件
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {lazy} from 'react';

export const SpuRouter = [
  {
    path: '/spu',
    component: lazy(() => import('../spuList')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/spu/add',
    component: lazy(() => import('../spuEdit')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/spu/:cid',
    component: lazy(() => import('../../sku/skuList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
