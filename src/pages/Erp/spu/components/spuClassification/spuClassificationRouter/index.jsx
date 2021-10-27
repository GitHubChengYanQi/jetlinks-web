/**
 * SPU分类路由文件
 *
 * @author song
 * @Date 2021-10-25 17:52:03
 */

import React, {lazy} from 'react';

export const SpuClassificationRouter = [
  {
    path: '/spuClassification',
    component: lazy(() => import('../spuClassificationList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
