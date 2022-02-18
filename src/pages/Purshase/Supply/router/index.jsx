import React, {lazy} from 'react';

export const SupplyListingRouter = [
  {
    path: '/supply',
    name: '供应商管理',
    component: lazy(() => import('../SupplyList')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/supply/add',
    name: '供应商管理',
    component: lazy(() => import('../SupplyEdit')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/supply/detail/:cid',
    name: '供应商管理',
    component: lazy(() => import('../SupplyDetail')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
