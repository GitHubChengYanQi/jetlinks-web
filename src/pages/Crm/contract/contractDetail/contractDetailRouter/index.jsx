/**
 * 合同产品明细路由文件
 *
 * @author sb
 * @Date 2021-09-18 15:29:24
 */

import React, {lazy} from 'react';

export const ContractDetailRouter = [
  {
    path: '/contractDetail',
    component: lazy(() => import('../contractDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
