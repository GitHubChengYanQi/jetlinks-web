/**
 * 工艺路线列表路由文件
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 14:12:28
 */

import React, {lazy} from 'react';

export const ProcessRouteRouter = [
  {
    path: '/processRoute',
    component: lazy(() => import('../processRouteList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
