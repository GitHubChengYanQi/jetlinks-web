/**
 * 路由文件
 *
 * @author cheng
 * @Date 2021-08-12 08:47:13
 */

import React, {lazy} from 'react';

export const PhoneRouter = [
  {
    path: '/phone',
    component: lazy(() => import('../phoneList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
