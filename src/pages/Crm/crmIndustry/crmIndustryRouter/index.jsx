/**
 * 行业表路由文件
 *
 * @author 
 * @Date 2021-07-31 16:28:22
 */

import React, {lazy} from 'react';

export const CrmIndustryRouter = [
  {
    path: '/crmIndustry',
    component: lazy(() => import('../crmIndustryList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
