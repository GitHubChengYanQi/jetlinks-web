/**
 * 出库表路由文件
 *
 * @author 
 * @Date 2021-07-15 17:41:40
 */

import React, {lazy} from 'react';

export const OutboundRouter = [
  {
    path: '/outbound',
    component: lazy(() => import('../outboundList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
