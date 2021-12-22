import React, {lazy} from 'react';

export const ToBuyPlanRouter = [
  {
    path: '/toBuyPlan',
    name:'待买计划',
    component: lazy(() => import('../ToBuyPlanList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
