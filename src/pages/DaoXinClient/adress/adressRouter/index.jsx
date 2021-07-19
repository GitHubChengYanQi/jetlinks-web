/**
 * 客户地址表路由文件
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React, {lazy} from 'react';

export const AdressRouter = [
  {
    path: '/adress',
    component: lazy(() => import('../adressList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
