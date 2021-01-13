import React, { lazy } from 'react';

export const GenRouter = [
  {
    path: '/gen',
    name: '代码生成',
    component: lazy(() => import('../GenEdit')),
    exact: true,
  }
];
