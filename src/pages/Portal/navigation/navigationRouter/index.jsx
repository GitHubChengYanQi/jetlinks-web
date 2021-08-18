/**
 * 导航表路由文件
 *
 * @author
 * @Date 2021-08-18 08:40:30
 */

import React, {lazy} from 'react';

export const NavigationRouter = [
  {
    path: '/navigation',
    name:'导航管理',
    component: lazy(() => import('../navigationList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
