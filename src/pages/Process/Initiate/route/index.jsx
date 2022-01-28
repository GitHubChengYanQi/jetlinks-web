
import React, {lazy} from 'react';

export const InitiateRouter = [
  {
    path: '/initiate',
    name: '入库管理',
    component: lazy(() => import('../initiateList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];

