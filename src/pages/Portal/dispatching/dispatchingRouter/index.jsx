/**
 * 派工表路由文件
 *
 * @author n
 * @Date 2021-08-23 10:25:48
 */

import React, {lazy} from 'react';

export const DispatchingRouter = [
  {
    path: '/dispatching',
    component: lazy(() => import('../dispatchingList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
