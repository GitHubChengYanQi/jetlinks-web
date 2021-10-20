/**
 * 参数配置路由文件
 *
 * @author
 * @Date 2021-10-20 10:50:00
 */

import React, {lazy} from 'react';

export const ConfigRouter = [
  {
    path: '/sysConfig',
    component: lazy(() => import('../configList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
