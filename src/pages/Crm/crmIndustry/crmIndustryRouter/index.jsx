/**
 * 行业表路由文件
 *
 * @author 
 * @Date 2021-08-02 08:25:03
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
