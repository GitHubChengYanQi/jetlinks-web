/**
 * 售后动态表路由文件
 *
 * @author 
 * @Date 2021-08-24 08:51:32
 */

import React, {lazy} from 'react';

export const RepairDynamicRouter = [
  {
    path: '/repairDynamic',
    component: lazy(() => import('../repairDynamicList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
