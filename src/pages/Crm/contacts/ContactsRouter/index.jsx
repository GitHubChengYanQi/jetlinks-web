/**
 * 联系人表路由文件
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy} from 'react';

export const ContactsRouter = [
  {
    path: '/contacts',
    name: '联系人管理',
    component: lazy(() => import('../ContactsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
