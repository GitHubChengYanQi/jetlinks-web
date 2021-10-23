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
    name:'物料管理',
    component: lazy(() => import('../spuList')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/spu/add',
    component: lazy(() => import('../spuEdit')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/spu/parts/:cid',
    component: lazy(() => import('../../parts/PartsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
