/**
 * 采购单路由文件
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React, {lazy} from 'react';

export const ProcurementOrderRouter = [
  {
    path: '/procurementOrder',
    name:'采购单管理',
    component: lazy(() => import('../procurementOrderList')),
    fallback: <div>loading...</div>,
    exact: true,
  }, {
    path: '/procurementOrder/:cid',
    name:'采购单详情',
    component: lazy(() => import('../Details/index')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
