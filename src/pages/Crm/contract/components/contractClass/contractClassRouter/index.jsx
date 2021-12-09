/**
 * 合同分类路由文件
 *
 * @author song
 * @Date 2021-12-09 14:11:38
 */

import React, {lazy} from 'react';

export const ContractClassRouter = [
  {
    path: '/contractClass',
    component: lazy(() => import('../contractClassList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
