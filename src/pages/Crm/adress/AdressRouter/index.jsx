/**
 * 客户地址表路由文件
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy} from 'react';

export const AdressRouter = [
  {
    path: '/adress',
    name: '客户地址',
    component: lazy(() => import('../AdressList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
