/**
 * 联系人表路由文件
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy} from 'react';

export const ContactsRouterEdit = [
  {
    path: '/contactsEdit',
    component: lazy(() => import('../contactsEdit')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
