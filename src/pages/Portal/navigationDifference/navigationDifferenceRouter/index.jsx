/**
 * 导航分类路由文件
 *
 * @author 
 * @Date 2021-08-18 10:38:50
 */

import React, {lazy} from 'react';

export const NavigationDifferenceRouter = [
  {
    path: '/navigationDifference',
    component: lazy(() => import('../navigationDifferenceList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
