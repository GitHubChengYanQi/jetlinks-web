import React, {lazy} from 'react';

export const GenRouter = [
  {
    path: '/gen',
    component: lazy(() => import('../GenEdit')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
