import React, {lazy} from 'react';
import ProcessLayout from '@/pages/Process';
import {InitiateRouter} from '@/pages/Process/Initiate/route';

const ProcessRouterConfig = [
  {
    path: '/process',
    name: '我发起的',
    component: ProcessLayout,
    children: [
      ...InitiateRouter,
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
