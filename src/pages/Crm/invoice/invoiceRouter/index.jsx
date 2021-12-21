/**
 * 供应商开票路由文件
 *
 * @author song
 * @Date 2021-12-20 11:29:00
 */

import React, {lazy} from 'react';

export const InvoiceRouter = [
  {
    path: '/invoice',
    component: lazy(() => import('../invoiceList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
