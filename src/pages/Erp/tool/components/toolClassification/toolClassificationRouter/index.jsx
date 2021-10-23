/**
 * 工具分类表路由文件
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

import React, {lazy} from 'react';

export const ToolClassificationRouter = [
  {
    path: '/toolClassification',
    component: lazy(() => import('../toolClassificationList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
