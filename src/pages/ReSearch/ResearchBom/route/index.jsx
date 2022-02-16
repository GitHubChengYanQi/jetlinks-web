import React, {lazy} from 'react';

export const ResearchBomRouter = [
  {
    path: '/researchBom',
    name: '工艺物料清单',
    component: lazy(() => import('../ResearchBomList')),
    fallback: <div>loading...</div>,
    exact: true,
  },{
    path: '/researchBom/:cid',
    name: '工艺物料清单',
    component: lazy(() => import('../../Detail')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
