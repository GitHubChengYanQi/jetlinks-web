/**
 * 部门表路由文件
 *
 * @author 
 * @Date 2020-12-21 17:16:04
 */

import React, {lazy} from 'react';

export const SysDeptRouter = [
  {
    path: '/sysDept',
    component: lazy(() => import('../sysDeptList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
