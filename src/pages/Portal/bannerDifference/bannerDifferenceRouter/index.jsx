/**
 * 轮播图分类路由文件
 *
 * @author 
 * @Date 2021-08-18 10:38:50
 */

import React, {lazy} from 'react';

export const BannerDifferenceRouter = [
  {
    path: '/bannerDifference',
    component: lazy(() => import('../bannerDifferenceList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
