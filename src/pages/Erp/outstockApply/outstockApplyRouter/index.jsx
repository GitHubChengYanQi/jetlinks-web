/**
 * 出库申请路由文件
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

import React, {lazy} from 'react';

export const OutstockApplyRouter = [
  {
    path: '/outstockApply',
    name: '发货申请',
    component: lazy(() => import('../outstockApplyList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
