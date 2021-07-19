/**
 * 联系人表路由文件
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React, {lazy} from 'react';

export const ContactsRouter = [
  {
    path: '/contacts',
    component: lazy(() => import('../contactsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
