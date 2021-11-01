/**
 * 二维码绑定路由文件
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React, {lazy} from 'react';

export const OrCodeBindRouter = [
  {
    path: '/orCodeBind',
    component: lazy(() => import('../orCodeBindList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
