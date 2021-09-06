/**
 * 公司角色表路由文件
 *
 * @author 
 * @Date 2021-09-06 11:29:56
 */

import React, {lazy} from 'react';

export const CompanyRoleRouter = [
  {
    path: '/companyRole',
    component: lazy(() => import('../companyRoleList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
