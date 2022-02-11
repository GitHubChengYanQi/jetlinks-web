/**
 * 工序关联绑定工具与设备表路由文件
 *
 * @author Captain_Jazz
 * @Date 2022-02-10 15:06:02
 */

import React, {lazy} from 'react';

export const ShipSetpBindRouter = [
  {
    path: '/shipSetpBind',
    component: lazy(() => import('../shipSetpBindList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
