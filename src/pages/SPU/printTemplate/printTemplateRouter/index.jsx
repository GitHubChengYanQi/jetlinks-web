/**
 * 编辑模板路由文件
 *
 * @author Captain_Jazz
 * @Date 2021-12-28 13:24:55
 */

import React, {lazy} from 'react';

export const PrintTemplateRouter = [
  {
    path: '/printTemplate',
    component: lazy(() => import('../printTemplateList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
