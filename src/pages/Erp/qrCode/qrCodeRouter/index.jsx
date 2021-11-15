/**
 * 二维码路由文件
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React, {lazy} from 'react';

export const QrCodeRouter = [
  {
    path: '/qrCode',
    component: lazy(() => import('../qrCodeList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
