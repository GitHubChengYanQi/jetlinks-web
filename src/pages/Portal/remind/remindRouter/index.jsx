/**
 * 提醒表路由文件
 *
 * @author cheng
 * @Date 2021-08-26 15:50:39
 */

import React, {lazy} from 'react';

export const RemindRouter = [
  {
    path: '/remind',
    component: lazy(() => import('../remindList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
