/**
 * 字段配置路由文件
 *
 * @author Sing
 * @Date 2020-12-12 10:33:42
 */

import React, {lazy} from 'react';

export const FieldConfigRouter = [
  {
    path: '/fieldConfig',
    component: lazy(() => import('../fieldConfigList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
