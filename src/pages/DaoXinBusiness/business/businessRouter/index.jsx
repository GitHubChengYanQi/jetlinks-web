/**
 * 商机表路由文件
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {lazy} from 'react';

export const BusinessRouter = [
  {
    path: '/business',
    component: lazy(() => import('../businessList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
