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
    component: lazy(() => import('../templateList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
