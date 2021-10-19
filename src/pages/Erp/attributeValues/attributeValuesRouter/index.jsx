/**
 * 产品属性数据表路由文件
 *
 * @author song
 * @Date 2021-10-18 11:30:54
 */

import React, {lazy} from 'react';

export const AttributeValuesRouter = [
  {
    path: '/attributeValues',
    component: lazy(() => import('../attributeValuesList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
