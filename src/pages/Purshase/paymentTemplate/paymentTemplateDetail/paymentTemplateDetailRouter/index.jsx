/**
 * 付款模板详情路由文件
 *
 * @author song
 * @Date 2022-02-24 10:36:06
 */

import React, {lazy} from 'react';

export const PaymentTemplateDetailRouter = [
  {
    path: '/paymentTemplateDetail',
    component: lazy(() => import('../paymentTemplateDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
