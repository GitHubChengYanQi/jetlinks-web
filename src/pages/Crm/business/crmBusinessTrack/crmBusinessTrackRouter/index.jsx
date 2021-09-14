/**
 * 项目跟踪表路由文件
 *
 * @author
 * @Date 2021-08-05 10:31:44
 */

import React, {lazy} from 'react';

export const CrmBusinessTrackRouter = [
  {
    path: '/crmBusinessTrack',
    component: lazy(() => import('../crmBusinessTrackList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
