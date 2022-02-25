/**
 * 付款模板路由文件
 *
 * @author song
 * @Date 2022-02-24 10:36:06
 */

import React, {lazy} from 'react';

export const PaymentTemplateRouter = [
  {
    path: '/paymentTemplate',
    component: lazy(() => import('../paymentTemplateList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
