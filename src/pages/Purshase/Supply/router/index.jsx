import React, {lazy} from 'react';

export const SupplyListingRouter = [
  {
    path: '/supply',
    name: '供应商列表',
    component: lazy(() => import('../SupplyList')),
    fallback: <div>loading...</div>,
    exact: true,
  },
  {
    path: '/supply/:cid',
    name: '供应商详情',
    component: lazy(() => import('../SupplyDetail')),
    fallback: <div>loading...</div>,
    exact: true,
  },
];
