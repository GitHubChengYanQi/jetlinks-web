/**
 * 分类明细内容路由文件
 *
 * @author siqiang
 * @Date 2021-08-18 15:57:52
 */

import React, {lazy} from 'react';

export const ClassDifferenceDetailsRouter = [
  {
    path: '/classDifferenceDetails',
    component: lazy(() => import('../components/ClassDifferenceDatailsTable')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
