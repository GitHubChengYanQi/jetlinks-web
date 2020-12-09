import React, {lazy} from 'react';

export const LoginLogRouter = [
  {
    path: '/loginLog',
    component: lazy(() => import('../loginLogList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
