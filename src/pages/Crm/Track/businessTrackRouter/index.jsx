/**
 * 跟进内容路由文件
 *
 * @author cheng
 * @Date 2021-09-17 10:35:56
 */

import React, {lazy} from 'react';

export const BusinessTrackRouter = [
  {
    path: '/businessTrack',
    component: lazy(() => import('../businessTrackList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
