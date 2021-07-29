/**
 * 合同模板路由文件
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {lazy} from 'react';

export const TemplateRouter = [
  {
    path: '/template',
    name: '合同模板',
    component: lazy(() => import('../TemplateList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
