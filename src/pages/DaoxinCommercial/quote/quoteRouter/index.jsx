/**
 * 报价表路由文件
 *
 * @author ta
 * @Date 2021-07-17 15:28:13
 */

import React, {lazy} from 'react';

export const QuoteRouter = [
  {
    path: '/quote',
    component: lazy(() => import('../quoteList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
