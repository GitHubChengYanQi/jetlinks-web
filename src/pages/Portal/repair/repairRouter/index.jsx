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
    component: lazy(() => import('../repairList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
