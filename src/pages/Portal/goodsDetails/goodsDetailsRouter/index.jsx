/**
 * 首页商品详情路由文件
 *
 * @author siqiang
 * @Date 2021-08-19 13:30:45
 */

import React, {lazy} from 'react';

export const GoodsDetailsRouter = [
  {
    path: '/goodsDetails',
    component: lazy(() => import('../goodsDetailsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
