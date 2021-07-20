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
    component: lazy(() => import('../contractMachineList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
