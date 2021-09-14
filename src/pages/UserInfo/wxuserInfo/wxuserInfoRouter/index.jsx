/**
 * 用户小程序关联路由文件
 *
 * @author cheng
 * @Date 2021-09-14 08:37:48
 */

import React, {lazy} from 'react';

export const WxuserInfoRouter = [
  {
    path: '/wxuserInfo',
    name:'微信绑定',
    component: lazy(() => import('../wxuserInfoList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
