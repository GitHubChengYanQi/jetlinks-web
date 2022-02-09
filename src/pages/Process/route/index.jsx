import React, {lazy} from 'react';
import ProcessLayout from '@/pages/Process';
import {InitiateRouter} from '@/pages/Process/Initiate/route';

const ProcessRouterConfig = [
  {
    path: '/process',
    name: '审批中心',
    component: ProcessLayout,
    children: [
      ...InitiateRouter,
      {
        path: '/MyAudit',
        name: '我审核的',
        component: lazy(() => import('../MyAudit/index')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        path: '/MySend',
        name: '我的抄送',
        component: lazy(() => import('../MySend/index')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        path: '/action/:id',
        name: '审批管理',
        component: lazy(() => import('../Action/index')),
        fallback: <div>loading...</div>,
        exact: true,
      },{
        path: '/action',
        name: '审批管理',
        component: lazy(() => import('../Action/index')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        redirect: '/process/initiate',
      }
    ]
  }
];
export default ProcessRouterConfig;
