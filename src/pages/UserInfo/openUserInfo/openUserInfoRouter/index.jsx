/**
 * 路由文件
 *
 * @author
 * @Date 2021-08-25 08:31:10
 */

import React, {lazy} from 'react';

export const OpenUserInfoRouter = [
  {
    path: '/openUserInfo',
    name: '微信用户',
    component: lazy(() => import('../openUserInfoList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];

console.log(OpenUserInfoRouter);
