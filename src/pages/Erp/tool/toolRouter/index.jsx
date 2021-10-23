/**
 * 工具表路由文件
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

import React, {lazy} from 'react';

export const ToolRouter = [
  {
    path: '/tool',
    component: lazy(() => import('../toolList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
