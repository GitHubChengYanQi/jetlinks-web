/**
 * 操作日志路由文件
 *
 * @author 
 * @Date 2021-11-05 11:42:40
 */

import React, {lazy} from 'react';

export const OperationLogRouter = [
  {
    path: '/operationLog',
    component: lazy(() => import('../operationLogList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
