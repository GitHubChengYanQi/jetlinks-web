/**
 * 话术基础资料路由文件
 *
 * @author
 * @Date 2021-09-11 13:27:08
 */

import React, {lazy} from 'react';

export const SpeechcraftRouter = [
  {
    path: '/speechcraft',
    component: lazy(() => import('../speechcraftList/index')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
