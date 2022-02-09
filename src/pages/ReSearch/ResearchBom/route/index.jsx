import React, {lazy} from 'react';

export const ResearchBomRouter = [
  {
    path: '/researchBom',
    name: '设计BOM',
    component: lazy(() => import('../ResearchBomList')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/researchBom/:cid',
    name: '设计BOM',
    component: lazy(() => import('../Detail')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
