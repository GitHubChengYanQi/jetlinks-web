/**
 * 材质路由文件
 *
 * @author 
 * @Date 2021-07-14 11:47:53
 */

import React, {lazy} from 'react';

export const DaoxinMaterialRouter = [
  {
    path: '/daoxinMaterial',
    component: lazy(() => import('../daoxinMaterialList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
