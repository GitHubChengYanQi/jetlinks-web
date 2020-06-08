import React, {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import otherRouters from './AppRouters';


const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    fallback: <div>loading...</div>,
    children: [
      ...otherRouters
    ],
  },
];

export default routerConfig;
