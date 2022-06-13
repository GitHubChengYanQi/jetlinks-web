/**
 * 注意事项路由文件
 *
 * @author song
 * @Date 2022-05-27 13:45:48
 */

import React, {lazy} from 'react';

export const AnnouncementsRouter = [
  {
    path: '/announcements',
    component: lazy(() => import('../announcementsList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
