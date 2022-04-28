import React, {lazy} from 'react';

export const DocumentsRouter = [
  {
    path: '/documents',
    name:'单据管理',
    component: lazy(() => import('../List')),
    fallback: <div>loading...</div>,
    exact: true,
  }, {
    path: '/documents/setting',
    name:'单据管理',
    component: lazy(() => import('../Setting')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
