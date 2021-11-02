/**
 * 二维码路由文件
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React, {lazy} from 'react';

export const OrCodeRouter = [
  {
    path: '/orCode',
    component: lazy(() => import('../orCodeList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
