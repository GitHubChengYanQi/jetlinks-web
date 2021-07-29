/**
 * 合同表路由文件
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {lazy} from 'react';

export const ContractRouter = [
  {
    path: '/contract',
    name: '合同管理',
    component: lazy(() => import('../ContractList')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/contract/addContract',
    name: '合同管理',
    component: lazy(() => import('../../addContract/AddContractList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
