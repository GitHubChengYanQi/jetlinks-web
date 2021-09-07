/**
 * 竞争对手报价路由文件
 *
 * @author
 * @Date 2021-09-06 16:08:01
 */

import React, {lazy} from 'react';

export const CompetitorQuoteRouter = [
  {
    path: '/competitorQuote',
    name: '报价管理',
    component: lazy(() => import('../competitorQuoteList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
