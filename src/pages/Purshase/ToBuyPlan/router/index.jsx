import React, {lazy} from 'react';

export const ToBuyPlanRouter = [
  {
    path: '/toBuyPlan',
    name: '预购管理',
    component: lazy(() => import('../ToBuyPlanList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/toBuyPlan/createOrder',
    name: '预购管理',
    component: lazy(() => import('../../../Order/CreateOrder')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
