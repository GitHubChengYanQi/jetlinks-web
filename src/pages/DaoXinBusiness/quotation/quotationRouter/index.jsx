/**
 * 报价表路由文件
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {lazy} from 'react';

export const QuotationRouter = [
  {
    path: '/quotation',
    component: lazy(() => import('../quotationList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
