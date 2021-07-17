/**
 * 经纬度表路由文件
 *
 * @author 
 * @Date 2021-07-16 12:55:35
 */

import React, {lazy} from 'react';

export const LalRouter = [
  {
    path: '/lal',
    component: lazy(() => import('../lalList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
