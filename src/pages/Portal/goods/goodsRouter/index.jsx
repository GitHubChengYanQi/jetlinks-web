/**
 * 首页商品路由文件
 *
 * @author siqiang
 * @Date 2021-08-19 08:53:11
 */

import React, {lazy} from 'react';

export const GoodsRouter = [
  {
    path: '/goods',
    name:'推荐商品管理',
    component: lazy(() => import('../goodsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
