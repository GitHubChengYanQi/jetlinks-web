/**
 * 产品属性表路由文件
 *
 * @author song
 * @Date 2021-10-18 11:28:39
 */

import React, {lazy} from 'react';

export const ItemAttributeRouter = [
  {
    path: '/itemAttribute',
    component: lazy(() => import('../itemAttributeList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
