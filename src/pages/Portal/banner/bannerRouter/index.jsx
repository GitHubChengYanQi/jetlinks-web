/**
 * 轮播图路由文件
 *
 * @author
 * @Date 2021-08-17 14:05:06
 */

import React, {lazy} from 'react';

export const BannerRouter = [
  {
    path: '/banner',
    name: '轮播图管理',
    component: lazy(() => import('../bannerList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
