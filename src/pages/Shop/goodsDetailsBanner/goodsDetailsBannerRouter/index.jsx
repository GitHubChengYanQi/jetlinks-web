/**
 * 商品轮播图路由文件
 *
 * @author siqiang
 * @Date 2021-08-19 16:34:29
 */

import React, {lazy} from 'react';

export const GoodsDetailsBannerRouter = [
  {
    path: '/goodsDetailsBanner',
    component: lazy(() => import('../goodsDetailsBannerList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
