/**
 * 报修路由文件
 *
 * @author siqiang
 * @Date 2021-08-20 17:16:16
 */

import React, {lazy} from 'react';

export const CompanyAddressRouter = [
  {
    path: '/companyAddress',
    component: lazy(() => import('../companyAddressList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
