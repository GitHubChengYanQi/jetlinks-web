import React, {lazy} from 'react';


export const CreateUserRouter = [
  {
    path:'/createUser',
    name:'创建用户',
    component:lazy(() => import('../CreateUserList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
