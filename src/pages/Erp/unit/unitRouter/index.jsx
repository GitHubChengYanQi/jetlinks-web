/**
 * 单位表路由文件
 *
 * @author cheng
 * @Date 2021-08-11 15:37:57
 */

import React, {lazy} from 'react';

export const UnitRouter = [
  {
    path: '/unit',
    component: lazy(() => import('../unitList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
