/**
 * 机床合同表路由文件
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */

import React, {lazy} from 'react';

export const ContractMachineRouter = [
  {
    path: '/contractMachine',
    name: '添加合同',
    component: lazy(() => import('../ContractMachineList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
