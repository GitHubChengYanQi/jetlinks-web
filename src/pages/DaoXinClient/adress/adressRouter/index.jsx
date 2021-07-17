/**
 * 客户地址表路由文件
 *
 * @author
 * @Date 2021-07-16 12:55:35
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
