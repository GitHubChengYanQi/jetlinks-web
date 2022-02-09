
import React, {lazy} from 'react';

export const InitiateRouter = [
  {
    path: '/initiate',
    name: '我发起的',
    component: lazy(() => import('../initiateList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];

