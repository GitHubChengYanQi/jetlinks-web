/**
 * 询价任务详情路由文件
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {lazy} from 'react';

export const InquiryTaskDetailRouter = [
  {
    path: '/inquiryTaskDetail',
    component: lazy(() => import('../inquiryTaskDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
