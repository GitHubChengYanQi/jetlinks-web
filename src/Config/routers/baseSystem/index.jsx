import React, {lazy} from 'react';
import BaseSystem from '@/pages/BaseSystem';

const systemConfig = [
  {
    path: '/BASE_SYSTEM',
    component: BaseSystem,
    children:[
      {
        path: '/mgr',
        component: lazy(() => import('@/pages/BaseSystem/user/UserList')),
        fallback: <div>loading...</div>,
        exact: true,
      },
      {
        redirect:'/BASE_SYSTEM/mgr',
      }
    ]
  },
];
export default systemConfig;
