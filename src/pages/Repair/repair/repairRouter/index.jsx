/**
 * 报修路由文件
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {lazy} from 'react';

export const RepairRouter = [
  {
    path: '/repair',
    name: '售后管理',
    component: lazy(() => import('../repairList')),
    fallback: <div>loading...</div>,
    exact: true,
  }, {
    path: '/repair/:cid',
    name: '报修详情',
    component: lazy(() => import('../RepairDetails')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
