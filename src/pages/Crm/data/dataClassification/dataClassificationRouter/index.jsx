/**
 * 资料分类表路由文件
 *
 * @author 
 * @Date 2021-09-13 12:51:21
 */

import React, {lazy} from 'react';

export const DataClassificationRouter = [
  {
    path: '/dataClassification',
    component: lazy(() => import('../dataClassificationList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
