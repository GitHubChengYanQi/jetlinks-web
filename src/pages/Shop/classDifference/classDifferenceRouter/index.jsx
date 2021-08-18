/**
 * 分类明细路由文件
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:33
 */

import React, {lazy} from 'react';

export const ClassDifferenceRouter = [
  {
    path: '/classDifference',
    component: lazy(() => import('../classDifferenceList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
