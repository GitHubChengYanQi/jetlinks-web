/**
 * 分类导航路由文件
 *
 * @author siqiang
 * @Date 2021-08-18 16:13:41
 */

import React, {lazy} from 'react';

export const DaoxinPortalClassRouter = [
  {
    path: '/daoxinPortalClass',
    component: lazy(() => import('../daoxinPortalClassList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
