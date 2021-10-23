/**
 * 产品订单路由文件
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {lazy} from 'react';

export const ProductOrderRouter = [
  {
    path: '/productOrder',
    component: lazy(() => import('../productOrderList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
