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
    name:'分类列表管理',
    component: lazy(() => import('../daoxinPortalClassList')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/daoxinPortalClass/:cid',
    name: '标题',
    component: lazy(() => import('@/pages/Shop/classDifferenceDetails/classDifferenceDetailsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
