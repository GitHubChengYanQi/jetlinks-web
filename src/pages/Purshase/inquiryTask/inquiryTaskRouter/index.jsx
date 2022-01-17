/**
 * 询价任务路由文件
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {lazy} from 'react';

export const InquiryTaskRouter = [
  {
    path: '/inquiryTask',
    name:'询价管理',
    component: lazy(() => import('../inquiryTaskList')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/inquiryTask/:cid',
    name:'询价详情',
    component: lazy(() => import('../InquiryDetail')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
